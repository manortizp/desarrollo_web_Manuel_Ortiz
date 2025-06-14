from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from werkzeug.utils import secure_filename
from collections import defaultdict
import os
from models import db, Actividad, ActividadTema, ContactarPor, Foto, Comuna, Region, Comentario
from sqlalchemy import desc, text

app = Flask(__name__)

def obtener_datos_desde_db():
    actividades = Actividad.query.all()
    datos = []

    for act in actividades:
        tema = (
            ActividadTema.query.filter_by(actividad_id=act.id).first()
        )
        datos.append({
            "fecha": act.dia_hora_inicio.strftime('%Y-%m-%d'),
            "hora_inicio": act.dia_hora_inicio.strftime('%H:%M'),
            "tipo": tema.tema if tema else 'Sin tema'
        })
    return datos

app.secret_key = 'supersecreto'
app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), 'static', 'uploads')

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://cc5002:programacionweb@localhost:3306/tarea2'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/')
def index():
    ultimas_actividades = (
        Actividad.query.order_by(desc(Actividad.id))
        .limit(5)
        .all()
    )

    actividades = []
    for act in ultimas_actividades:
        fotos = Foto.query.filter_by(actividad_id=act.id).all()
        temas = ActividadTema.query.filter_by(actividad_id=act.id).all()

        actividades.append({
            'inicio': act.dia_hora_inicio.strftime('%Y-%m-%d %H:%M'),
            'termino': act.dia_hora_termino.strftime('%Y-%m-%d %H:%M') if act.dia_hora_termino else '',
            'comuna': act.comuna.nombre,
            'sector': act.sector or '',
            'tema': temas[0].tema if temas else '',
            'fotos': [f'/static/uploads/{os.path.basename(f.ruta_archivo)}' for f in fotos],
        })
    return render_template('index.html', actividades=actividades)

@app.route('/agregar', methods=['GET', 'POST'])
def agregar():
    if request.method == 'POST':
        # Obtener datos
        comuna_id = request.form.get('comuna_id')
        sector = request.form.get('sector')
        nombre = request.form.get('nombre')
        email = request.form.get('email')
        celular = request.form.get('celular')
        descripcion = request.form.get('descripcion')
        
        try:
            dia_inicio = datetime.fromisoformat(request.form.get('dia_hora_inicio'))
        except Exception:
            flash("Fecha de inicio inválida", "error")
            return render_template('agregar-actividad.html') # vuelve al formulario con datos rellenados

        dia_termino_raw = request.form.get('dia_hora_termino')
        dia_termino = None
        if dia_termino_raw:
            try:
                dia_termino = datetime.fromisoformat(dia_termino_raw)
            except Exception:
                flash("Fecha de término inválida", "error")
                return render_template('agregar-actividad.html')
            
        temas = request.form.getlist('temas[]')
        glosas = request.form.getlist('glosa_otro[]')
        medios = request.form.getlist('contacto[]')
        identificadores = request.form.getlist('identificador[]')
        archivos = request.files.getlist('fotos')

        errores = []

        # Validación en el servidor
        if not nombre or not email or not dia_inicio:
            errores.append("Faltan campos obligatorios.")

        if errores:
            flash("Errores en el formulario:" + ", ".join(errores), "error")
            return render_template('agregar-actividad.html') # vuelve al formulario con datos rellenados

        actividad = Actividad(
            comuna_id=comuna_id,
            sector=sector,
            nombre=nombre,
            email=email,
            celular=celular,
            dia_hora_inicio=dia_inicio,
            dia_hora_termino=dia_termino,
            descripcion=descripcion
        )
        db.session.add(actividad)
        db.session.commit()

        for i, tema in enumerate(temas):
            atema = ActividadTema(
                tema=tema,
                glosa_otro=glosas[i] if tema == 'otro' else None,
                actividad_id=actividad.id
            )
            db.session.add(atema)

        for i, medio in enumerate(medios):
            contacto = ContactarPor(
                nombre=medio,
                identificador=identificadores[i] if i < len(identificadores) else "",
                actividad_id=actividad.id
            )
            db.session.add(contacto)

        for archivo in archivos:
            if archivo.filename:
                filename = secure_filename(archivo.filename)
                ruta = os.path.join(app.config['UPLOAD_FOLDER'], filename)
                archivo.save(ruta)
                foto = Foto(
                    ruta_archivo=ruta,
                    nombre_archivo=filename,
                    actividad_id=actividad.id
                )
                db.session.add(foto)

        db.session.commit()
        flash("Actividad agregada exitosamente", "success")
        return redirect(url_for('index'))
    
    regiones = Region.query.order_by(Region.nombre).all()
    return render_template('agregar-actividad.html', regiones=regiones)

@app.route('/listado')
def listado():
    page = request.args.get('page', 1, type=int)
    per_page = 5

    pagination = Actividad.query.order_by(desc(Actividad.dia_hora_inicio)).paginate(page=page, per_page=per_page)
    actividades = []

    for act in pagination.items:
        fotos = Foto.query.filter_by(actividad_id=act.id).all()
        temas = ActividadTema.query.filter_by(actividad_id=act.id).all() 
    
        actividades.append({
            'id': act.id,
            'inicio': act.dia_hora_inicio.strftime('%Y-%m-%d %H:%M'),
            'termino': act.dia_hora_termino.strftime('%Y-%m-%d %H:%M') if act.dia_hora_termino else '',
            'comuna': act.comuna.nombre,
            'sector': act.sector or '',
            'tema': temas[0].tema if temas else '',
            'organizador': act.nombre,
            'fotos': [f'/static/uploads/{os.path.basename(f.ruta_archivo)}' for f in fotos],
        })

    return render_template('listado.html', pagination=pagination, actividades=actividades)

@app.route('/estadistica')
def estadistica():
    return render_template('estadistica.html')

@app.route("/api/estadistica")
def api_estadistica():
    datos = obtener_datos_desde_db()

    # Actividades por día
    actividades_por_dia = defaultdict(int)
    for d in datos:
        actividades_por_dia[d["fecha"]] += 1

    lineas = [{"fecha": fecha, "cantidad": cantidad} for fecha, cantidad in sorted(actividades_por_dia.items())]

    # Actividades por tipo
    actividades_por_tipo = defaultdict(int)
    for d in datos:
        actividades_por_tipo[d["tipo"]] += 1

    torta = [{"tipo": tipo, "cantidad": cantidad} for tipo, cantidad in actividades_por_tipo.items()]

    # Actividades por mes y franja horaria
    def obtener_franja(hora):
        h, m = map(int, hora.split(':'))
        total_min = h * 60 + m
        if total_min < 720: # antes de las 12:00
            return 'manana'
        elif total_min < 1140: # entre las 12:00 y las 19:00
            return 'tarde'
        else: # de 19:00 en adelante
            return 'noche' 
        
    actividades_por_mes_franja = defaultdict(lambda: {'manana':0, 'tarde':0, 'noche':0})
    for d in datos:
        fecha = datetime.strptime(d["fecha"], "%Y-%m-%d")
        mes = fecha.strftime("%Y-%m")
        franja = obtener_franja(d["hora_inicio"])
        actividades_por_mes_franja[mes][franja] += 1

    barras = []
    for mes, franjas in sorted(actividades_por_mes_franja.items()):
        barras.append({
            "mes": mes,
            "manana": franjas['manana'],
            "tarde": franjas['tarde'],
            "noche": franjas['noche']
        })

    return jsonify({
        "actividades_por_dia":lineas,
        "actividades_por_tipo":torta,
        "actividades_por_mes_franja":barras
    })

@app.route("/api/comunas")
def obtener_comunas():
    region_id = request.args.get("region_id")
    comunas = Comuna.query.filter_by(region_id=region_id).order_by(Comuna.nombre).all()
    return jsonify([{"id": c.id, "nombre": c.nombre} for c in comunas])

# Bloque para probar la conexión a la base de datos
with app.app_context():
    try:
        db.session.execute(text('SELECT 1'))
        print(" Conexión a la base de datos exitosa.")
    except Exception as e:
        print(" Error al conectar a la base de datos:", e)


@app.route("/api/comentario", methods=["POST"])
def agregar_comentario():
    data = request.get_json()

    actividad_id = data.get("actividad_id")
    nombre = data.get("nombre", "").strip()
    texto = data.get("texto", "").strip()

    # Validaciones
    errores = []
    if len(nombre) < 3 or len(nombre) > 80:
        errores.append("El nombre  debe tener entre 3 y 80 caracteres.")
    if len(texto) < 5:
        errores.append("El comentario debe tener al menos 5 caracteres.")
    if not actividad_id:
        errores.append("Actividad no especificada")
    
    if errores:
        return jsonify({"success": False, "errores": errores}), 400
    
    comentario = Comentario(actividad_id=actividad_id, nombre=nombre, texto=texto, fecha=datetime.now())
    db.session.add(comentario)
    db.session.commit()

    return jsonify({
        "success": True,
        "comentario": {
            "nombre": comentario.nombre,
            "texto": comentario.texto,
            "fecha": comentario.fecha.strftime("%Y-%m-%d %H:%M")
        }
    })

@app.route("/api/comentarios/<int:actividad_id>")
def obtener_comentarios(actividad_id):
    comentarios = Comentario.query.filter_by(actividad_id=actividad_id).order_by(Comentario.fecha.desc()).all()
    lista = [{
        "nombre": c.nombre,
        "texto": c.texto,
        "fecha": c.fecha.strftime("%Y-%m-%d %H:%M")
    } for c in comentarios]
    return jsonify(lista)

if __name__ == '__main__':
    app.run(debug=True)