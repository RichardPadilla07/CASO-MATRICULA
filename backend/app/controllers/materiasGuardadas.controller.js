import MateriasGuardadas from '../models/materiasGuardadas.js';

// Obtener todas las materias guardadas de un estudiante
export const getMateriasGuardadasByEstudiante = async (req, res) => {
    try {
        const registros = await MateriasGuardadas.find({ cedula_estudiante: req.params.cedula });
        if (!registros.length) {
            return res.json([]);
        }
        // Obtener los datos de cada materia y su código de matrícula
        const materiasGuardadas = await Promise.all(registros.map(async (reg) => {
            const materia = await (await import('../models/materia.js')).default.findById(reg.id_materia);
            return {
                id_materia: reg.id_materia,
                nombre: materia ? materia.nombre : '',
                creditos: materia ? materia.creditos : '',
                codigo_materia: materia ? materia.codigo : '',
                codigo_matricula: reg.codigo_matricula || '',
                fecha_guardado: reg.fecha_guardado
            };
        }));
        res.json(materiasGuardadas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Guardar una materia para un estudiante (cada materia es un documento)
export const guardarMateria = async (req, res) => {
    try {
        const { cedula_estudiante, id_materia, codigo_matricula } = req.body;
        // Verificar si ya existe la materia guardada para ese estudiante
        const existe = await MateriasGuardadas.findOne({ cedula_estudiante, id_materia });
        if (existe) {
            return res.status(400).json({ message: 'La materia ya está guardada para este estudiante.' });
        }
        const registro = new MateriasGuardadas({
            cedula_estudiante,
            id_materia,
            codigo_matricula
        });
        await registro.save();
        res.status(201).json({ message: 'Materia guardada', registro });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar una materia guardada (por estudiante y materia)
export const eliminarMateriaGuardada = async (req, res) => {
    try {
        const { cedula_estudiante, id_materia } = req.body;
        const resultado = await MateriasGuardadas.findOneAndDelete({ cedula_estudiante, id_materia });
        if (!resultado) {
            return res.status(404).json({ message: 'No se encontró la materia guardada.' });
        }
        res.json({ message: 'Materia eliminada', resultado });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
