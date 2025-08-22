import MateriasGuardadas from '../models/materiasGuardadas.js';

// Obtener todas las materias guardadas de un estudiante
export const getMateriasGuardadasByEstudiante = async (req, res) => {
    try {
        const registro = await MateriasGuardadas.findOne({ cedula_estudiante: req.params.cedula });
        if (!registro || !registro.materias.length) {
            return res.json([]);
        }
        // Obtener los datos de cada materia y su código de matrícula
        const materiasGuardadas = await Promise.all(registro.materias.map(async (mat) => {
            const materia = await (await import('../models/materia.js')).default.findById(mat.id_materia);
            return {
                id_materia: mat.id_materia,
                nombre: materia ? materia.nombre : '',
                creditos: materia ? materia.creditos : '',
                codigo_materia: materia ? materia.codigo : '',
                codigo_matricula: mat.codigo_matricula || '',
            };
        }));
        res.json(materiasGuardadas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Guardar una materia para un estudiante
export const guardarMateria = async (req, res) => {
    try {
        const { cedula_estudiante, id_materia, codigo_matricula } = req.body;
        let registro = await MateriasGuardadas.findOne({ cedula_estudiante });
        if (!registro) {
            registro = new MateriasGuardadas({
                cedula_estudiante,
                materias: [{ id_materia, codigo_matricula }]
            });
        } else {
            // Verificar si la materia ya está guardada
            const existe = registro.materias.some(mat => mat.id_materia.toString() === id_materia);
            if (!existe) {
                registro.materias.push({ id_materia, codigo_matricula });
            }
        }
        await registro.save();
        res.status(201).json({ message: 'Materia guardada', registro });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Eliminar una materia guardada
export const eliminarMateriaGuardada = async (req, res) => {
    try {
        const { cedula_estudiante, id_materia } = req.body;
        const registro = await MateriasGuardadas.findOne({ cedula_estudiante });
        if (registro) {
            registro.materias = registro.materias.filter(m => m.toString() !== id_materia);
            await registro.save();
        }
        res.json({ message: 'Materia eliminada', registro });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
