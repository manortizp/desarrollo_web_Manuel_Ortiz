from datetime import datetime
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from werkzeug.utils import secure_filename
import os
from models import db, Actividad, ActividadTema, ContactarPor, Foto, Comuna, Region
from sqlalchemy import desc

app = Flask(__name__)
app.secret_key = 'supersecreto'
app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), 'uploads')

os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://cc5002:programacionweb@localhost:3306/tarea2'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

@app.route('/')
def index():
    return render_template('index.html')

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
            'comuna': act.comuna_id,
            'sector': act.sector or '',
            'tema': temas[0].tema if temas else '',
            'organizador': act.nombre,
            'fotos': [f'/static/uploads/{os.path.basename(f.ruta_archivo)}' for f in fotos],
        })

    return render_template('listado.html', pagination=pagination)

@app.route('/estadistica')
def estadistica():
    return render_template('estadistica.html')

@app.route("/api/comunas")
def obtener_comunas():
    region_id = request.args.get("region_id")
    comunas = Comuna.query.filter_by(region_id=region_id).order_by(Comuna.nombre).all()
    return jsonify([{"id": c.id, "nombre": c.nombre} for c in comunas])


if __name__ == '__main__':
    app.run()