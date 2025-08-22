import MateriasGuardadas from '../models/materiasGuardadas.js';

// Obtener todas las materias guardadas de un estudiante
export const getMateriasGuardadasByEstudiante = async (req, res) => {
    try {
        const registro = await MateriasGuardadas.findOne({ cedula_estudiante: req.params.cedula }).populate('materias');
        if (!registro || !registro.materias.length) {
            return res.json([]);
        }
        // Devolver cada materia con los datos y el código de matrícula
        const materiasGuardadas = registro.materias.map(materia => ({
            id_materia: materia._id,
            nombre: materia.nombre,
            creditos: materia.creditos,
            codigo_materia: materia.codigo,
            codigo_matricula: registro.codigo_matricula || '',
        }));
        res.json(materiasGuardadas);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Guardar una materia para un estudiante
export const guardarMateria = async (req, res) => {
    try {
        const { cedula_estudiante, id_materia } = req.body;
        let registro = await MateriasGuardadas.findOne({ cedula_estudiante });
        if (!registro) {
            registro = new MateriasGuardadas({ cedula_estudiante, materias: [id_materia] });
        } else {
            if (!registro.materias.includes(id_materia)) {
                registro.materias.push(id_materia);
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
