const piano = new Tone.Sampler({
    urls: {
        A0: 'A0.mp3',
        C1: 'C1.mp3',
        'D#1': 'Ds1.mp3',
        'F#1': 'Fs1.mp3',
        A1: 'A1.mp3',
        C2: 'C2.mp3',
        'D#2': 'Ds2.mp3',
        'F#2': 'Fs2.mp3',
        A2: 'A2.mp3',
        C3: 'C3.mp3',
        'D#3': 'Ds3.mp3',
        'F#3': 'Fs3.mp3',
        A3: 'A3.mp3',
        C4: 'C4.mp3',
        'D#4': 'Ds4.mp3',
        'F#4': 'Fs4.mp3',
        A4: 'A4.mp3',
        C5: 'C5.mp3',
        'D#5': 'Ds5.mp3',
        'F#5': 'Fs5.mp3',
        A5: 'A5.mp3',
        C6: 'C6.mp3',
        'D#6': 'Ds6.mp3',
        'F#6': 'Fs6.mp3',
        A6: 'A6.mp3',
        C7: 'C7.mp3',
        'D#7': 'Ds7.mp3',
        'F#7': 'Fs7.mp3',
        A7: 'A7.mp3',
        C8: 'C8.mp3',
    },
    release: 1,
    baseUrl: 'https://tonejs.github.io/audio/salamander/',
}).toDestination();

const majorScales = {
    C: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    D: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
    E: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
    F: ['F', 'G', 'A', 'A#', 'C', 'D', 'E'],
    G: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
    A: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
    B: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
};


const allPianoNotes = [
    'C0', 'C#0', 'D0', 'D#0', 'E0', 'F0', 'F#0', 'G0', 'G#0', 'A0', 'A#0', 'B0',
    'C1', 'C#1', 'D1', 'D#1', 'E1', 'F1', 'F#1', 'G1', 'G#1', 'A1', 'A#1', 'B1',
    'C2', 'C#2', 'D2', 'D#2', 'E2', 'F2', 'F#2', 'G2', 'G#2', 'A2', 'A#2', 'B2',
    'C3', 'C#3', 'D3', 'D#3', 'E3', 'F3', 'F#3', 'G3', 'G#3', 'A3', 'A#3', 'B3',
    'C4', 'C#4', 'D4', 'D#4', 'E4', 'F4', 'F#4', 'G4', 'G#4', 'A4', 'A#4', 'B4',
    'C5', 'C#5', 'D5', 'D#5', 'E5', 'F5', 'F#5', 'G5', 'G#5', 'A5', 'A#5', 'B5',
    'C6', 'C#6', 'D6', 'D#6', 'E6', 'F6', 'F#6', 'G6', 'G#6', 'A6', 'A#6', 'B6',
    'C7', 'C#7', 'D7', 'D#7', 'E7', 'F7', 'F#7', 'G7', 'G#7', 'A7', 'A#7', 'B7',
    'C8'
];

const key = document.getElementById('key');
let notasParaSecuencia =[]
let generatedSequence = []





function isValidInterval(nextNoteIndex, previousNoteIndex, maxInterval) {
    return Math.abs(nextNoteIndex - previousNoteIndex) <= maxInterval;
}



function displaySequence(sequence) {
    sequenceDisplay.textContent = sequence.join(', ');
}





const sequenceDisplay = document.getElementById('sequenceDisplay');
const numNotesInput = document.getElementById('numNotes');
const maxIntervalInput = document.getElementById('maxInterval');


window.addEventListener('load', function () {
    updateNotes(1);
});



const durations = ['8n', '4n', '2n', '16n'];

function generateRandomRhythm() {
    const rhythm = [];
    const notesCopy = [...generatedSequence]; // Copia de las notas disponibles

    for (let i = 0; i < 16; i++) {
        const noteOrSilence = Math.random() < 0.45; // Probabilidad de silencio
        if (noteOrSilence) {
            rhythm.push(null); // Agregar silencio
        } else {
            if (notesCopy.length > 0) {
                const noteIndex = Math.floor(Math.random() * notesCopy.length);
                const note = notesCopy.splice(noteIndex, 1)[0]; // Obtener una nota aleatoria y eliminarla
                const duration =
                    durations[Math.floor(Math.random() * durations.length)];
                rhythm.push({ note, duration });
            }
        }
    }
    return rhythm;
}


document.getElementById('toggle-visibility').addEventListener('click', toggleVisibility);
document.getElementById('play-rhythm').addEventListener('click', playRhythm);

function toggleVisibility() {
    const rhythmContainer = document.getElementById('rhythm-container');
    // Cambiar la visibilidad del contenedor
    if (rhythmContainer.style.display === 'none') {
        rhythmContainer.style.display = 'block'; // Mostrar
    } else {
        rhythmContainer.style.display = 'none'; // Ocultar
    }
}

const modal = document.getElementById('sequenceModal');
const btn = document.getElementById('toggleSequence');
const closeBtn = document.getElementById('closeModal');

// Mostrar el modal al hacer clic en el botón
btn.addEventListener('click', function () {
    modal.style.display = 'block';
});

// Cerrar el modal al hacer clic en el botón de cierre (X)
closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
});

// Cerrar el modal si se hace clic fuera de él
window.addEventListener('click', function (event) {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

bpmSlider.addEventListener('input', () => {
    const bpm = parseInt(bpmSlider.value, 10);
    bpmDisplay.textContent = bpm;
    Tone.Transport.bpm.value = bpm;
});


bpmSlider.addEventListener('input', () => {
    const bpm = parseInt(bpmSlider.value, 10);
    bpmDisplay.textContent = bpm;
    Tone.Transport.bpm.value = bpm;
});
let currentLoopId = null;

function playRhythm() {
    Tone.Transport.stop();
    Tone.Transport.cancel();

    if (currentLoopId !== null) {
        currentLoopId.dispose();
    }

    const rhythm = generateRandomRhythm();

    const combinacion = rhythm.map(item => ({
        nota: item ? item.note : null,
        duracion: item ? item.duration : '4n'
    }));

    currentLoopId = new Tone.Loop((time) => {
        combinacion.forEach(({ nota, duracion }, i) => {
            if (nota) {
                // Ajustar el volumen dinámicamente en cada repetición
                const volumen = 0.2 + Math.random() * 1; // Rango dinámico de 0.5 a 1.5
                const durationInSeconds = Tone.Time(duracion).toSeconds();
                piano.triggerAttackRelease(nota, durationInSeconds, time + i * durationInSeconds, volumen);

                // Imprimir el volumen en la consola
                console.log(`Nota: ${nota}, Volumen: ${volumen.toFixed(2)}, Duración: ${duracion}`);
            }
        });
    }, '1m');

    Tone.Transport.start();
    currentLoopId.start(0);

    console.log('Iniciando el loop...');
}


document.getElementById('stop-loop').addEventListener('click', function () {
    if (currentLoopId !== null) {
        currentLoopId.dispose(); // Detenemos el loop
        Tone.Transport.stop(); // Detenemos el transporte
        console.log("Loop detenido.");
    }
});


const synths = [];
const brownNoiseSynth = new Tone.Noise('brown').toDestination();
brownNoiseSynth.volume.value = -27;

const reverb = new Tone.Reverb(5).toDestination();
brownNoiseSynth.connect(reverb);

let isPlaying = false;


const octaveSelector = document.getElementById('octaveSelector');

function getSelectedRootNote() {
    const note = key.value;
    const octave = octaveSelector.value;
    return `${note}${octave}`;
}


function createDrone(rootNote) {
    const scale = Tone.Frequency(rootNote).harmonize([0, 7, 12]);


    scale.forEach((freq, index) => {
        const leftOsc = new Tone.Oscillator(freq, 'sine').toDestination();
        const rightOsc = new Tone.Oscillator(freq * (1 + (index % 2 === 0 ? 0.001 : -0.001)), 'sine').toDestination(); // Desfase mínimo para binaural
        leftOsc.volume.value = -22;
        rightOsc.volume.value = -22;


        synths.push(leftOsc, rightOsc);


        leftOsc.start();
        rightOsc.start();
    });


    brownNoiseSynth.start();
}

async function toggleDrone() {
    await Tone.start(); // Necesario para que funcione en navegadores modernos
    if (isPlaying) {
        // Detener y limpiar todos los osciladores
        synths.forEach((synth) => {
            synth.stop();
            synth.dispose(); // Liberar recursos del sintetizador
        });
        synths.length = 0; // Limpiar la lista de sintetizadores

        brownNoiseSynth.stop(); // Detener el brown noise
        isPlaying = false;
    } else {
        const rootNote = getSelectedRootNote(); // Usar la nota seleccionada
        createDrone(rootNote);
        isPlaying = true;
    }
}


document
    .getElementById('toggleDrone')
    .addEventListener('click', toggleDrone);


    const teclas = document.querySelectorAll('.tecla');
    let escala = []
    let escalaKey =[]
    function inicializarEscala() {
        teclas.forEach((tecla) => {
            if (tecla.classList.contains('presionada')) {
                // Si la tecla ya está marcada como presionada, agregarla a la escala
                const nombre = tecla.getAttribute('data-nombre');
                if (!escala.includes(nombre)) {
                    escala.push(nombre);
                }
            }
        });

        // Ordenar el arreglo escala y generar la escala inicial en el DOM
        escala.sort((a, b) => a - b);
        generarEscala(key.value, escala); // Asume que keySelect y generarEscala ya están definidos
        escalaKey =generarEscalaKey(key.value, escala)
        console.log("escalaKey inicializado", escalaKey)
    }
    inicializarEscala();

    teclas.forEach((tecla) => {
        tecla.addEventListener('click', () => {
            tecla.classList.toggle('presionada');
            const nombre = tecla.getAttribute('data-nombre');
    
            // Agregar o quitar la tecla de la escala
            if (escala.includes(nombre)) {
                const index = escala.indexOf(nombre);
                escala.splice(index, 1);
            } else {
                escala.push(nombre);
            }
    
            // Ordenar el arreglo de menor a mayor
            escala.sort((a, b) => a - b);
    
            // Generar la nueva escala en el DOM
            generarEscala(key.value, escala);
            const escalaKey =generarEscala(key, escala)
            console.log("cambio en el escalaKey", escalaKey)
            
        });
    });
    
    function generarEscala(key, escala) {
        const notasCiclicas = [
            'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G',
            'G#', 'A', 'A#', 'B',
            'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G',
            'G#', 'A', 'A#'
        ];
        const indexTonica = notasCiclicas.indexOf(key);
        const nuevoArray = [];
        escala.forEach((nota) => {
            const indiceReal = parseInt(nota) + indexTonica;
            nuevoArray.push(notasCiclicas[indiceReal+1]);
        });
        console.log("cambio en la escala:", escala);
        return nuevoArray;
    }


    function generarEscalaKey(key, escala) {
        const notasCiclicas = [
            'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G',
            'G#', 'A', 'A#', 'B',
            'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G',
            'G#', 'A', 'A#'
        ];
        const indexTonica = notasCiclicas.indexOf(key);
        
        const nuevoArray = [];
        escala.forEach((nota) => {
            const indiceReal = parseInt(nota) + indexTonica;
            nuevoArray.push(notasCiclicas[indiceReal]);
        });
        escalaKey=nuevoArray
        console.log("cambio en la escala key desde la función generarEscalaKey:", escalaKey );
        return nuevoArray;
    }
    console.log("Key:", key.value);
    console.log("Escala:", escala);
    
    console.log("escalaKey", escalaKey);

    key.addEventListener('change', () => {
        const keyAuxiliar=key.value
        generarEscala(keyAuxiliar, escala);
        generarEscalaKey(keyAuxiliar, escala);
        actualizarNotasSeleccionadas()
        
    });






//de aca empieza

const escalaPrueba = ['A#', 'B#', 'C#','D#','E#','F','G'];

    let notasFiltradas = []
    // Poblar los selectores con las notas
    const notaMinimaSelect = document.getElementById('notaMinima');
    const notaMaximaSelect = document.getElementById('notaMaxima');
    
    allPianoNotes.forEach((note, index) => {
        const optionMin = document.createElement('option');
        const optionMax = document.createElement('option');
        optionMin.value = index;
        optionMin.textContent = note;
        optionMax.value = index;
        optionMax.textContent = note;
        notaMinimaSelect.appendChild(optionMin);
        notaMaximaSelect.appendChild(optionMax);
    });

    // Función para generar el array de notas seleccionadas
    function generarNotasSeleccionadas() {
        const notaMinima = parseInt(notaMinimaSelect.value, 10);
        const notaMaxima = parseInt(notaMaximaSelect.value, 10);
        if (notaMinima <= notaMaxima) {
            return allPianoNotes.slice(notaMinima, notaMaxima + 1);
        } else {
            return [];
        }
    }

// Función para aplicar el filtro, solo mostrar notas que estén en la escala
function filtrarNotasPorEscala(notasSeleccionadas) {
return notasSeleccionadas.filter(note => {
    // Extraer la clave musical ignorando la octava
    const claveMusical = note.replace(/[0-9]/g, ''); // Elimina cualquier dígito (la octava)
    return escalaKey.includes(claveMusical); // Verifica si la clave está en la escala
});
}



// Función para actualizar las opciones del selector de nota máxima
function actualizarNotaMaxima() {
const notaMinimaIndex = parseInt(notaMinimaSelect.value, 10);
const notaMaximaIndex = parseInt(notaMaximaSelect.value, 10);

// Si la nueva nota mínima es mayor que la nota máxima actual
if (notaMinimaIndex > notaMaximaIndex) {
    // Ajustar automáticamente la nota máxima al siguiente valor tras la mínima
    notaMaximaSelect.value = notaMinimaIndex + 1;
}

// Filtrar las notas que son mayores que la nota mínima seleccionada
const opcionesMaximas = allPianoNotes.slice(notaMinimaIndex + 1);

// Limpiar las opciones actuales de nota máxima
notaMaximaSelect.innerHTML = '';

// Agregar las nuevas opciones para la nota máxima
opcionesMaximas.forEach((note, index) => {
    const optionMax = document.createElement('option');
    optionMax.value = notaMinimaIndex + 1 + index;
    optionMax.textContent = note;
    notaMaximaSelect.appendChild(optionMax);
});

// Restaurar el valor actual de nota máxima si sigue siendo válido
if (notaMaximaIndex > notaMinimaIndex) {
    notaMaximaSelect.value = notaMaximaIndex;
} else {
    // Si no es válido, ajustamos al mínimo permitido
    notaMaximaSelect.value = notaMinimaIndex + 1;
}
}



    // Función para actualizar las notas seleccionadas en el DOM
    function actualizarNotasSeleccionadas() {
        const notasSeleccionadas = generarNotasSeleccionadas();
        const notasFiltradas = filtrarNotasPorEscala(notasSeleccionadas); // Aplicar el filtro
        document.getElementById('resultado').textContent = notasFiltradas.join(', ');
        // Imprimir el array en consola con su nombre
        notasParaSecuencia=notasFiltradas
        console.log('Notas seleccionadas filtradas:', notasFiltradas);
        console.log('esta es el conjunto de notas disponibles:', notasParaSecuencia);
    }

    // Primero, definir C4 como la nota mínima
    const defaultMinIndex = allPianoNotes.indexOf('C4');
    notaMinimaSelect.value = defaultMinIndex;
    actualizarNotaMaxima(); // Actualizar las opciones de la nota máxima después de definir la mínima

    // Luego, establecer C5 como la nota máxima por defecto
    const defaultMaxIndex = allPianoNotes.indexOf('C5');
    notaMaximaSelect.value = defaultMaxIndex;

    // Escuchar los cambios en los selectores para actualizar las notas seleccionadas
    notaMinimaSelect.addEventListener('change', function() {
        actualizarNotaMaxima();
        actualizarNotasSeleccionadas();
    });
    
    notaMaximaSelect.addEventListener('change', actualizarNotasSeleccionadas);

    // Inicializar las notas seleccionadas en el DOM
    actualizarNotasSeleccionadas();


    

    function generateRandomNotesNuevo(n, maxInterval,notasParaSecuencia) {
 
        const availableNotes = notasParaSecuencia
    
        const sequence = [];
        let previousNoteIndex = Math.floor(Math.random() * availableNotes.length);
    
        for (let i = 0; i < n; i++) {
            let nextNoteIndex;
            do {
                nextNoteIndex = Math.floor(Math.random() * availableNotes.length);
            } while (!isValidInterval(nextNoteIndex, previousNoteIndex, maxInterval));
    
            sequence.push(availableNotes[nextNoteIndex]);
            previousNoteIndex = nextNoteIndex;
        }
        console.log("secuencia desde el generateRandomNuevo",sequence)
        return sequence;
       
    }
    generateRandomNotesNuevo(5,12,notasParaSecuencia)

    document.getElementById('generateNotes').addEventListener('click', function () {
        const n = Math.min(50, Math.max(1, parseInt(numNotesInput.value))); // Asegurarse de que n esté entre 1 y 50
        const maxInterval = parseInt(maxIntervalInput.value);
        
        const sequence = generateRandomNotesNuevo(n, maxInterval,notasParaSecuencia); // Generar la secuencia de notas
        displaySequence(sequence); // Mostrar la secuencia
        generatedSequence = sequence; // Guardar la secuencia generada en la variable
        console.log("secuencia generada desde el boton generate notes",generatedSequence)
    });

const fileList = `
      ahntone_c2.mp3
      ahntone_c3.mp3
      ahntone_c4.mp3
      ahntone_c4_2.mp3
      ahntone_c5.mp3
      ahntone_f#2.mp3
      ahntone_f#3.mp3
      ahntone_f#4.mp3
      air_blast_1.mp3
      air_blast_2.mp3
      airblower.mp3
      aircompressor.mp3
      alarm1.mp3
      alarm2.mp3
      alien_1.mp3
      alien_2.mp3
      alien_3.mp3
      alien_4.mp3
      allen_wrench_1.mp3
      allen_wrench_2.mp3
      allen_wrench_3.mp3
      aluminium_1.mp3
      aluminium_2.mp3
      aluminium_3.mp3
      aluminium_foil_1.mp3
      aluminum1.mp3
      aluminum2.mp3
      aluminum3.mp3
      aluminumhit1.mp3
      aluminumhit2.mp3
      ambiance_1.mp3
      ambient_machine1.mp3
      ambient_machine2.mp3
      ambient_policesiren.mp3
      ambient_rain.mp3
      Analogsynth_octaves_high.mp3
      Analogsynth_octaves_highmid.mp3
      Analogsynth_octaves_low.mp3
      Analogsynth_octaves_lowmid.mp3
      Analogsynth2_high.mp3
      Analogsynth2_higher.mp3
      Analogsynth2_highmid.mp3
      Analogsynth2_low.mp3
      Analogsynth2_lowmid.mp3
      Analogsynth2_mid.mp3
      animal_noises1.mp3
      animal_noises2.mp3
      animal_vocal_1.mp3
      animal_vocal_2.mp3
      animal_vocal_3.mp3
      animal_vocal_4.mp3
      animals1.mp3
      animals2.mp3
      animals3.mp3
      anklung_1.mp3
      anklung_2.mp3
      anklung_scale_1.mp3
      anklung_scale_2.mp3
      Arp_note.mp3
      Arp_note+2wholesteps.mp3
      arpeggio_shortFX1.mp3
      arpeggio_shortFX2.mp3
      arpeggio_shortFX3.mp3
      arpeggio_shortFX4.mp3
      arpeggio1.mp3
      arpeggio1a.mp3
      arpeggio2.mp3
      arpeggio2HIGH.mp3
      arpeggio3crazy.mp3
      asprin_crinkle_1.mp3
      asprin_crinkle_2.mp3
      asthmainhaler.mp3
      asthmainhaler2.mp3
      atmospher_long_1.mp3
      atmosphere_1.mp3
      atmosphere_long_2.mp3
      background_noise_1.mp3
      background_noise_1_2.mp3
      background_noise_2.mp3
      baffle_1.mp3
      baffle_2.mp3
      bag1.mp3
      bag2.mp3
      ball_bouncing_1.mp3
      ball_bouncing_2.mp3
      ball_in_glass_1.mp3
      ball_in_glass_2.mp3
      ball_in_glass_3.mp3
      ball_tunnel_1.mp3
      ball_tunnel_2.mp3
      ballbearing_waves1.mp3
      ballbearing_waves2.mp3
      ballbearings.mp3
      ballbearings2.mp3
      balloon_blow1.mp3
      balloon_blow2.mp3
      balloon_blow3.mp3
      balloon_drumming1.mp3
      balloon_drumming2.mp3
      balloon_drumming3.mp3
      balloon_drumming4.mp3
      balloon_noises1.mp3
      balloon_noises2.mp3
      balloon_noises3.mp3
      balloon_squeak_1.mp3
      balloon_squeak_2.mp3
      balloon_squeal_1.mp3
      balloon_squeal_2.mp3
      balloon_static_rub1.mp3
      balloon_static_rub2.mp3
      balloon_stretch_1.mp3
      balloon_stretch_2.mp3
      balloon_trumpet1.mp3
      balloon_trumpet2.mp3
      balloon_trumpet3.mp3
      balloon1.mp3
      balloon2.mp3
      balloon3.mp3
      balloon4.mp3
      balloon5.mp3
      balloon6.mp3
      balloon7.mp3
      balloonbass1.mp3
      balloonbass2.mp3
      balloondrumming1.mp3
      balloondrumming2.mp3
      balloonrubbing1.mp3
      balloonrubbing2.mp3
      balloonrubbing3.mp3
      bamboo_a#4_1.mp3
      bamboo_a#5_1.mp3
      bamboo_a3_1.mp3
      bamboo_c#5_1.mp3
      bamboo_c3_1.mp3
      bamboo_c3_2.mp3
      bamboo_f4_1.mp3
      bamboonaphone_1.mp3
      bamboonaphone_2.mp3
      bang_on_barel1.mp3
      bang_on_barel2.mp3
      bang_on_barel3.mp3
      Bang_Tin_1.mp3
      Bang_Tin_2.mp3
      bang_wood_on_metal1.mp3
      bang_wood_on_metal2.mp3
      bang_wood_on_metal3.mp3
      bang_wood_on_metal4.mp3
      banging_a_grill1.mp3
      banging_a_grill2.mp3
      banging_a_grill3.mp3
      banging_a_grill4.mp3
      banging_a_grill5.mp3
      banging_a_grill6.mp3
      banging_a_grill7.mp3
      banjo_pin_1.mp3
      banjo_pin_2.mp3
      barel_hit1.mp3
      barel_hit2.mp3
      barel_hit3.mp3
      barel_strike1.mp3
      barel_strike2.mp3
      barel_strike3.mp3
      barel_strike4.mp3
      barel_strike5.mp3
      bass_string1.mp3
      bass_string2.mp3
      bass_string3.mp3
      bass_string4.mp3
      bass_string5.mp3
      bass_string6.mp3
      bbs_on_cd_1.mp3
      bbs_on_cd_2.mp3
      bead_in_can1.mp3
      bead_in_can2.mp3
      beer_cap1.mp3
      beer_cap2.mp3
      beer_cap3.mp3
      beer_cap4.mp3
      beer_pour.mp3
      beer_pour2.mp3
      beer_pour3.mp3
      bell_1.mp3
      bell_1a.mp3
      bell_1b.mp3
      bell_2.mp3
      bell_2a.mp3
      bell_2b.mp3
      bell_ball1.mp3
      bell_ball2.mp3
      bell_ball3.mp3
      bell_hits_1.mp3
      bell_hits_2.mp3
      bell_light_1.mp3
      bell_light_2.mp3
      bell_mallet_2.mp3
      bell_mallett_1.mp3
      bell_roll_1.mp3
      bell_roll_2.mp3
      bell_spin.mp3
      bell1.mp3
      bell1a.mp3
      bell2.mp3
      bell2a.mp3
      bell3.mp3
      bell-rope1.mp3
      bell-rope2.mp3
      bicycle_pump_1.mp3
      bicycle_pump_2.mp3
      big_rattle_1.mp3
      big_rattle_2.mp3
      bike_bell_1.mp3
      bike_bell_2.mp3
      bilatone_1.mp3
      bird1.mp3
      bird2.mp3
      bird3.mp3
      bird4.mp3
      bird5.mp3
      birds_in_a_park.mp3
      birds_outside1.mp3
      birds_outside2.mp3
      birdsinapark1.mp3
      birdsinapark2.mp3
      BlackboardHit1.mp3
      BlackboardHit2.mp3
      blender_pulse_1.mp3
      blender_pulse_2.mp3
      blinds_1.mp3
      blinds1.mp3
      blinds2.mp3
      board_1.mp3
      boardSlam_2X4_1.mp3
      boardSlam_2X4_2.mp3
      boat_engine1.mp3
      boat_engine2.mp3
      boing_water1.mp3
      boing_water2.mp3
      boing_water3.mp3
      boing_water4.mp3
      boing_water5.mp3
      boing_water6.mp3
      boing_water7.mp3
      boing_water8.mp3
      bolt_jingle_1.mp3
      bolt_jingle_2.mp3
      bone_snap_1.mp3
      Bongiovannitones_1.mp3
      bongiovannitones_2.mp3
      boston_Subway_1.mp3
      boston_Subway_2.mp3
      boston_Subway_4.mp3
      bottle_1.mp3
      bottle_2.mp3
      bottle_blow1.mp3
      bottle_blow2.mp3
      bottle_blow3.mp3
      bottle_down_stairs_1.mp3
      bottle_lit_1.mp3
      bottle_tone1.mp3
      bottle_tone2.mp3
      bottle_tone3.mp3
      bottlecap_1.mp3
      bottlecap_2.mp3
      bow_box_1.mp3
      bow_box_2.mp3
      bow_on_box_1.mp3
      bow_on_box_2.mp3
      bow_on_box_4.mp3
      bowed_cymbal_1.mp3
      bowed_cymbal_1b.mp3
      bowed_cymbal_2.mp3
      bowed_cymbal_2b.mp3
      bowed_cymbal_3.mp3
      bowed_trashcan_lid_1.mp3
      bowed_trashcan_lid_2.mp3
      bowedGlass_1.mp3
      bowedGlass_2.mp3
      bowedGlass_3.mp3
      bowl_1.mp3
      bowl_1a.mp3
      bowl_2.mp3
      bowl_2a.mp3
      bowl_bell.mp3
      bowl_bell2.mp3
      bowl_bell3.mp3
      bowl_bell4.mp3
      bowl_with_keys.mp3
      bowlbang.mp3
      box_with_keys.mp3
      brassbowlhit1.mp3
      brassbowlhit2.mp3
      brassbowlhit3.mp3
      brassbowlsrubbing.mp3
      bread_cutting1.mp3
      bread_cutting2.mp3
      brush_hit_1.mp3
      brush_hit_2.mp3
      bubblewrap1.mp3
      bubblewrap2.mp3
      bulbpop_1.mp3
      bulbpop_2.mp3
      bulbpop_3.mp3
      bulbpop_4.mp3
      buzz.mp3
      buzzer.mp3
      cabbage_1.mp3
      cabbage_2.mp3
      cakelid_gong1.mp3
      cakelid_gong2.mp3
      camera_1.mp3
      camera_1a.mp3
      camera_2.mp3
      camera_2a.mp3
      camera1.mp3
      camera1d.mp3
      camera2.mp3
      camera2d.mp3
      camera3.mp3
      camera3d.mp3
      camera4.mp3
      camera4d.mp3
      can_crumple1.mp3
      can_crumple2.mp3
      can_crush_foot1.mp3
      can_crush_foot2.mp3
      can_down_stairs_1.mp3
      can_down_stairs_2.mp3
      can_hit_1.mp3
      can_hit_1b.mp3
      can_hit_2.mp3
      can_hit_2b.mp3
      can_opening1.mp3
      can_opening2.mp3
      candle_holder_1.mp3
      candle_holder_2.mp3
      candle_holder_long_1.mp3
      caps1.mp3
      caps2.mp3
      caps3.mp3
      car_door_1.mp3
      car_door_2.mp3
      car_door_hit_1.mp3
      car_door_hit_2.mp3
      car_engine_1.mp3
      car_engine_1a.mp3
      car_horn_1.mp3
      car_horn_2.mp3
      carboardbox1.mp3
      carboardbox2.mp3
      card_in_fan_1.mp3
      card_on_spokes_1.mp3
      card_on_spokes_2.mp3
      cardboard_1.mp3
      carddeck1.mp3
      carddeck2.mp3
      carddeck3.mp3
      cardoor.mp3
      cards1.mp3
      cards2.mp3
      cart_1.mp3
      casiohorn_glissando1.mp3
      casiohorn_glissando2.mp3
      casiohorn_short1.mp3
      casiohorn_short2.mp3
      casiohorn_short3.mp3
      casiohorn1.mp3
      casiohorn1+5.mp3
      casiohorn1+b3.mp3
      casiohorn2.mp3
      casiohorn2+5.mp3
      casiohorn2+b3.mp3
      casiohorn3.mp3
      cat_rattle_1.mp3
      cat_rattle_2.mp3
      cd_spin1.mp3
      cd_spin2.mp3
      cd_spin3.mp3
      cello_bow_off_1.mp3
      cello_torture_1.mp3
      cello_torture_2.mp3
      ceramictile1.mp3
      ceramictile2.mp3
      ceramictile3.mp3
      ceramictile4.mp3
      cereal_1.mp3
      cereal_2.mp3
      chain.mp3
      chain_1.mp3
      chain_1b.mp3
      chain_2.mp3
      chain_2b.mp3
      chain_drag_long_1.mp3
      chain_drop_1.mp3
      chain_drop_2.mp3
      chain_drop_3.mp3
      chain_hits.mp3
      chaindrop1.mp3
      chaindrop2.mp3
      chains.mp3
      chains_rattle_1.mp3
      chainSwoosh.mp3
      chainSwoosh2_rhythmic.mp3
      chair_squeak_1.mp3
      chair_squeak_1b.mp3
      chair_squeak_2.mp3
      cheek_flaps_1.mp3
      cheek_flaps_2.mp3
      cheers_1.mp3
      cheers_2.mp3
      chewing_1.mp3
      chewing_1b.mp3
      chewing_2.mp3
      chewing_2b.mp3
      children_and_fountain.mp3
      children_and_fountain2.mp3
      chime_1.mp3
      chime_2.mp3
      chime_3.mp3
      chimeballs1.mp3
      chimeballs2.mp3
      chimeballs3.mp3
      chimesmajsixth.mp3
      chimesmajthird.mp3
      chimesshortphrase.mp3
      chimes-singlenote.mp3
      china_cymbal1.mp3
      china_cymbal2.mp3
      china_cymbal3.mp3
      chip_crush_1.mp3
      chip_crush_2.mp3
      chip_in_glass_1.mp3
      chirping_1.mp3
      chong_tone_1.mp3
      chong_tone_2.mp3
      chopping1.mp3
      chopping2.mp3
      chopping3.mp3
      chopping4.mp3
      chotone_c1_1.mp3
      chotone_c4_!.mp3
      chotone_f#3_!.mp3
      chriping_2.mp3
      clang_1.mp3
      clang_1a.mp3
      clang_1b.mp3
      clang_1c.mp3
      clang_2.mp3
      clang_2a.mp3
      clang_3.mp3
      clang_4.mp3
      clangs_1.mp3
      clangs_2.mp3
      clap_1.mp3
      Clap1.mp3
      Clap2.mp3
      Clap3.mp3
      click_1.mp3
      click_1a.mp3
      click_2.mp3
      clonk1.mp3
      clonk2.mp3
      clonk3.mp3
      clonk4.mp3
      closingdoor.mp3
      cloth_ripping.mp3
      clothesdryer.mp3
      clutterstatic1.mp3
      clutterstatic2.mp3
      coffee_machine1.mp3
      coffee_machine2.mp3
      coffee_machine3.mp3
      coffee_machine4.mp3
      coin_spinning_1.mp3
      coin_spinning_2.mp3
      coinspin1.mp3
      coinspin2.mp3
      coinspin3.mp3
      coke_bottle_1.mp3
      coke_bottle-2.mp3
      coke_can1.mp3
      coke_can2.mp3
      comping1.mp3
      comping2.mp3
      comping3.mp3
      comping4.mp3
      computer_drill_short1.mp3
      computer_drill_short2.mp3
      computer_drill_short3.mp3
      computer_drill_short4.mp3
      computer_drill_short5.mp3
      computer_flute1.mp3
      computer_flute2.mp3
      computer_mania1.mp3
      computer_mania2.mp3
      computer_phone_tone1.mp3
      computer_phone_tone2.mp3
      conga_1.mp3
      conga_2.mp3
      conga_3.mp3
      conga_4.mp3
      conga_loop_110.mp3
      conga_loop_220.mp3
      conga_roll_1.mp3
      conga_roll_2.mp3
      construction_1.mp3
      construction_2.mp3
      coocoo_flute1.mp3
      coocoo_flute2.mp3
      coocoo_flute3.mp3
      cookie_sheet_1.mp3
      cookie_sheet_2.mp3
      cookie_sheet_3.mp3
      CookieTin1.mp3
      cookietin1a.mp3
      CookieTin2.mp3
      cookietin2a.mp3
      CookieTin3.mp3
      cookietin3a.mp3
      cookietin4.mp3
      cookietinspin1.mp3
      cookietinspin2.mp3
      Cool_WhaleFX_Analog1.mp3
      Cool_WhaleFX_Analog2.mp3
      Cool_WhaleFX_Analog3.mp3
      Cool_WhaleFX_Analog4.mp3
      copier_1.mp3
      copier_2.mp3
      cowbell1_big.mp3
      cowbell2_small.mp3
      cowbell3_plural.mp3
      cracker_1.mp3
      cracker_2.mp3
      crackling.mp3
      crackling_1.mp3
      crackling_2.mp3
      crackling2.mp3
      crash_1.mp3
      crash_2.mp3
      crash_cymbal1.mp3
      crash_cymbal2.mp3
      crash_cymbal3.mp3
      crazybreathing1.mp3
      crazybreathing2.mp3
      creaky_door_1.mp3
      creaky_door_2.mp3
      crinkle_1.mp3
      crinkle_1a.mp3
      crinkle_1b.mp3
      crinkle_2.mp3
      crinkle_2a.mp3
      crowd1.mp3
      crowd2.mp3
      crowd3.mp3
      crowd4.mp3
      crowd5.mp3
      crumpled_bag.mp3
      cup_drop_1.mp3
      cup_drop_2.mp3
      cut_cardboard_1.mp3
      cut_cardboard_2.mp3
      cutting_cardboard_1.mp3
      cutting_cardboard_2.mp3
      cutting_ceramic_noise.mp3
      cym1.mp3
      cym2.mp3
      cym3.mp3
      cymbal_drop1.mp3
      cymbal_drop2.mp3
      cymbal1.mp3
      cymbal2.mp3
      cymbolscratch1.mp3
      cymbolscratch2.mp3
      cymbolscratch3.mp3
      cymbolscratch4.mp3
      cymbolscratch5.mp3
      cymbolscratch6.mp3
      debris_1.mp3
      decent_1.mp3
      digeradoo_1.mp3
      digeridoo_1.mp3
      digeridoo_1b.mp3
      digeridoo_2.mp3
      dirt_can_1.mp3
      dirt_can_2.mp3
      dog_bark_1.mp3
      dog_bark_2.mp3
      dog1.mp3
      dog2.mp3
      door_close1.mp3
      door_close2.mp3
      door_close3.mp3
      door_creak1.mp3
      door_creak2.mp3
      door_hangar1.mp3
      door_hangar2.mp3
      door_hangar3.mp3
      door_openclose1.mp3
      door_openclose2.mp3
      door_shut_1.mp3
      door_shut_2.mp3
      door_slam_1.mp3
      door_slam_2.mp3
      door_slam_clipped_1.mp3
      door_slam_tunnel_1.mp3
      door_slam_tunnel_2.mp3
      door_squeak_1.mp3
      door_squeak_2.mp3
      doorbell1.mp3
      doorbell2.mp3
      DoorSlam1.mp3
      doorslam1a.mp3
      doorslam1d.mp3
      DoorSlam2.mp3
      doorslam2a.mp3
      doorslam2d.mp3
      doorslam3.mp3
      double_kick1.mp3
      double_kick2.mp3
      down_vocals_1.mp3
      dragging_chair1.mp3
      dragging_chair2.mp3
      dragging_chair3.mp3
      dragging_chair4.mp3
      dragging_gargabe_can_1.mp3
      draggingmetal1.mp3
      draggingmetal2.mp3
      dremel_1.mp3
      dremel_2.mp3
      drill_1.mp3
      drill_2.mp3
      drill_on_plastic_cup_1.mp3
      drill_on_pot_1.mp3
      drill_on_pot_2.mp3
      drill_short_1.mp3
      drill_short_2.mp3
      drill_small_1.mp3
      drill1.mp3
      drill2.mp3
      drill3.mp3
      drillinginstyrofoam.mp3
      drillinginstyrofoam2.mp3
      dripamin_1.mp3
      dripamin_2.mp3
      Driving_1.mp3
      Driving_2.mp3
      dropping_bbs_1.mp3
      dropping_bbs_2.mp3
      DroppingCoins1.mp3
      DroppingCoins2.mp3
      DroppingCoins3.mp3
      drum_low_1.mp3
      drum_low_2.mp3
      drumming_clanks.mp3
      drumming_clanks2.mp3
      drumming_clanks3.mp3
      dryer.mp3
      dryer1.mp3
      dryer2.mp3
      drymetalhit1.mp3
      drymetalhit2.mp3
      duct_tape_1.mp3
      duct_tape_1a.mp3
      duct_tape_1b.mp3
      duct_tape_2.mp3
      duct_tape_2a.mp3
      duct_tape_2b.mp3
      dull_container_1.mp3
      dull_container_2.mp3
      dumpster_hit1.mp3
      dumpster_hit2.mp3
      dumpster_hit3.mp3
      dust_pan_!.mp3
      dust_pan_2.mp3
      dust_puffer1.mp3
      dust_puffer2.mp3
      duster_1.mp3
      duster_2.mp3
      e7_funkLine1.mp3
      eating_an_apple.mp3
      eating_an_apple2.mp3
      eating_an_apple3.mp3
      eating_chips_1.mp3
      eating_chips_2.mp3
      eating_chips_3.mp3
      eating_doritos1.mp3
      eating_doritos2.mp3
      eating_doritos3.mp3
      eerie_synth1.mp3
      eerie_synth2.mp3
      eerie_synth3.mp3
      eerie_synth4.mp3
      eerie_synth5.mp3
      eerie_synth6.mp3
      eerie_synth7.mp3
      eerie_synth8.mp3
      eerie_synth9.mp3
      egg_beater_1.mp3
      egg_beater_2.mp3
      egg_beater_and_paper_1.mp3
      egg_beater_and_paper_2.mp3
      egg_shaker1.mp3
      egg_shaker2.mp3
      Electric_noise.mp3
      electric_screwdriver1.mp3
      electric_screwdriver2.mp3
      electric_screwdriver3.mp3
      electric_screwdriver4.mp3
      electric_sharpener1.mp3
      electric_sharpener2.mp3
      electric_sharpener3.mp3
      elevator_!.mp3
      elevator_1.mp3
      Engine_noise.mp3
      engine_noise_2.mp3
      enotherapy_1.mp3
      enotherapy_2.mp3
      enotherapy_3.mp3
      enotherapy_4.mp3
      ethnic_groove_1.mp3
      eviltoy1.mp3
      eviltoy2.mp3
      explosion_1.mp3
      explosion_2.mp3
      explosion_3.mp3
      fabric_rustling.mp3
      fake_gunfire_1.mp3
      fake_gunfire_2.mp3
      fake_gunfire_3.mp3
      fakejungle1.mp3
      fakejungle2.mp3
      falling_can_1.mp3
      falling_can_2.mp3
      falling_gliss_analog1.mp3
      falling_gliss_analog2.mp3
      falling_gliss_analog3.mp3
      falling_gliss_analog4.mp3
      falling_gliss_analog5.mp3
      falling_gliss_analog6.mp3
      falling_plate_1.mp3
      fan_1.mp3
      fan_1a.mp3
      fan_long_1.mp3
      fan_noise.mp3
      fan_rattle_1.mp3
      fan_reso_1.mp3
      fan_reso_2.mp3
      fan_reso_3.mp3
      feedback_1.mp3
      feedback_2.mp3
      feedback_efx_1.mp3
      feedback_efx_2.mp3
      femalevoice_aa_A3.mp3
      femalevoice_aa_A4.mp3
      femalevoice_aa_A5.mp3
      femalevoice_aa_C6.mp3
      femalevoice_aa_Db4.mp3
      femalevoice_aa_Db5.mp3
      femalevoice_aa_Eb4.mp3
      femalevoice_aa_F5.mp3
      femalevoice_oo_A4.mp3
      femalevoice_oo_A5.mp3
      femalevoice_oo_C6.mp3
      femalevoice_oo_Db4.mp3
      femalevoice_oo_Db5.mp3
      femalevoice_oo_femalevoice_oo_A3.mp3
      femalevoices_aa2_A3.mp3
      femalevoices_aa2_A4.mp3
      femalevoices_aa2_A5.mp3
      femalevoices_aa2_C#4.mp3
      femalevoices_aa2_C5.mp3
      femalevoices_aa2_C6.mp3
      femalevoices_aa2_F#5.mp3
      femalevoices_oo2_A3.mp3
      femalevoices_oo2_A4.mp3
      femalevoices_oo2_A5.mp3
      femalevoices_oo2_C#4.mp3
      femalevoices_oo2_C#5.mp3
      femalevoices_oo2_c6.mp3
      fiberboard_percussive1.mp3
      fiberboard_percussive2.mp3
      fiberboard_rumble1.mp3
      fiberboard_rumble2.mp3
      fiberboard_rumble3.mp3
      fingers_1.mp3
      fingers_chalk_1.mp3
      fingers_chalk_2.mp3
      finyl_flex_2.mp3
      fire_hose_1.mp3
      fire_hose_2.mp3
      fire_long.mp3
      fish_food_1.mp3
      fish_food_2.mp3
      fishertone_c2_1.mp3
      fishertone_c3_2.mp3
      fishertone_c4_1.mp3
      fishertone_f#2_1.mp3
      fishertone_f#3_1.mp3
      flam_click_1.mp3
      flush.mp3
      flute_foghorn_1.mp3
      flute_foghorn_2.mp3
      flute_harmonics_1.mp3
      flute_harmonics_2.mp3
      flute_harmonics_3.mp3
      flute_harmonics_4.mp3
      flute_trill_1.mp3
      flute_trill_2.mp3
      fly_theremin_1.mp3
      FM_beat.mp3
      FM_doublebass.mp3
      FM_doublebass2.mp3
      FM_doublebass3.mp3
      FM_doublebass4.mp3
      FM_dubhit1.mp3
      FM_dubhit2.mp3
      FM_dubhit3.mp3
      FM_long.mp3
      foil_on_mic_1.mp3
      foil_on_mic_1a.mp3
      foil_on_mic_2.mp3
      foil_on_mic_2a.mp3
      foil_rattle1.mp3
      foil_rattle2.mp3
      foilcrumble.mp3
      food_chopper_1.mp3
      food_chopper_2.mp3
      footsteps_long_1.mp3
      forboding_synth_tritones1.mp3
      forboding_synth_tritones2.mp3
      forboding_synth_tritones3.mp3
      forboding_synth_tritones4.mp3
      forboding_synth_tritones5.mp3
      forboding_synth_tritones6.mp3
      formant1.mp3
      formant1a.mp3
      formant2.mp3
      formant2a.mp3
      formant3.mp3
      fume_1.mp3
      fume_2.mp3
      fuzz_bass_1.mp3
      fuzz_bass_2.mp3
      garbage_can_hit_1.mp3
      garbage_can_hit_2.mp3
      garbage_can_lid_1.mp3
      garbage_can_lid_2.mp3
      garbage_truck_1.mp3
      garbagecan_hits1.mp3
      garbagecan_hits2.mp3
      garbagecan_rolling1.mp3
      garbagecan_rolling2.mp3
      garbagecan_rolling3.mp3
      gargle_1.mp3
      gargle_2.mp3
      ghost_1.mp3
      ghost_2.mp3
      glas_spin_2.mp3
      glass_beads_1.mp3
      glass_beads_2.mp3
      glass_beads_swirl_1.mp3
      glass_break.mp3
      glass_break2.mp3
      glass_break3.mp3
      glass_cup_1.mp3
      glass_cup_2.mp3
      glass_harmonica_1.mp3
      glass_harmonica_2.mp3
      glass_harmonica_3.mp3
      glass_noise1.mp3
      glass_noise2.mp3
      glass_noise3.mp3
      glass_noise4.mp3
      glass_on_foil_static.mp3
      glass_on_foil1.mp3
      glass_on_foil2.mp3
      glass_rattle1.mp3
      glass_rattle2.mp3
      glass_rattle3.mp3
      glass_spin_1.mp3
      glass_tone1.mp3
      glass_tone2.mp3
      glass_tone3.mp3
      glass_tone4.mp3
      glassbeads1.mp3
      glassbeads2.mp3
      GlassBreak1.mp3
      GlassBreak2.mp3
      glasshit1.mp3
      glasshit2.mp3
      glasshit3.mp3
      glitch_1.mp3
      glitch_2.mp3
      glitch_3.mp3
      glitch_bongo_1.mp3
      glitch_groove_1.mp3
      glitch_groove_2.mp3
      glitch_groove_3.mp3
      glitch_groove_4.mp3
      glitch_groove_5.mp3
      glitch_groove_6.mp3
      glitch_groove_7.mp3
      goat_hoof_2.mp3
      goat_hoof_rattle_1.mp3
      goat_hoof_rattle_2.mp3
      goat_hoof-1.mp3
      gong_1.mp3
      gong_2.mp3
      gong_granular1.mp3
      gong_granular2.mp3
      gong_growling1.mp3
      gong_growling2.mp3
      gong_growling3.mp3
      gong_shot1.mp3
      gong_shot2.mp3
      gong_shot3.mp3
      gravel.mp3
      gravel_reverb1.mp3
      gravel_reverb2.mp3
      gravelcrunch.mp3
      grill_top_slide1.mp3
      grill_top_slide2.mp3
      grill_top_slide3.mp3
      grill_top_slide4.mp3
      grinding_lids1.mp3
      grinding_lids2.mp3
      grocery_store_1.mp3
      groovin_analogsynth1.mp3
      groovin_analogsynth2.mp3
      groovin_analogsynth3.mp3
      group_anklung_long_1.mp3
      guitar_Astring.mp3
      guitar_Bstring.mp3
      guitar_chord1.mp3
      guitar_chord2.mp3
      guitar_chord3.mp3
      guitar_chord4.mp3
      guitar_Dstring.mp3
      guitar_Gstring.mp3
      guitar_highEstring.mp3
      guitar_hit_!.mp3
      guitar_hit_2.mp3
      guitar_LowEstring1.mp3
      guitar_LowEstring2.mp3
      guitar_pick_1.mp3
      guitar_pick_2.mp3
      guitar_pick_3.mp3
      guitar_riff_cutup1.mp3
      guitar_riff_cutup2.mp3
      guitar_riff_cutup3.mp3
      guitar_riff_cutup4.mp3
      guitar_riff_cutup5.mp3
      guitar_scrape_1.mp3
      guitar_scrape_2.mp3
      gurgling_theremin_1.mp3
      hairbrush_on_mug.mp3
      hairbrush_on_mug2.mp3
      hairbrush_on_mug3.mp3
      hair-dryer.mp3
      hallwaynoises1.mp3
      hallwaynoises2.mp3
      hallwaynoises3.mp3
      hallwaytalking_.mp3
      hand_drum_.mp3
      hand_drum_1.mp3
      hand_drum_2.mp3
      hand_drum_3.mp3
      hand_drum_4.mp3
      hand_drum_5.mp3
      hand_drum_6.mp3
      hand_drum_7.mp3
      hand_drum_9.mp3
      hand_drum_10.mp3
      hand_duster_1.mp3
      hand_duster_2.mp3
      hand_duster_3.mp3
      hand_fan_1.mp3
      hand_fan_2.mp3
      hand_on_wood_1.mp3
      Handbrake1.mp3
      Handbrake2.mp3
      hard_shake_1.mp3
      hard_shake_2.mp3
      hard_shake_3.mp3
      heels_on_tile_1.mp3
      helicopter_1.mp3
      helicopter_2.mp3
      HIGHFREQmetal_bars.mp3
      hit_1.mp3
      hit_2.mp3
      hit_3.mp3
      hit1.mp3
      hit2.mp3
      hit3.mp3
      hittingscreen1.mp3
      hittingscreen2.mp3
      hittingscreen3FAST.mp3
      hollowhitLOUD.mp3
      hollowhitSOFT.mp3
      honking1.mp3
      honking2.mp3
      horse1.mp3
      horse2.mp3
      hubcap_1.mp3
      hubcap_2.mp3
      hubcap_roll_1.mp3
      hubcap_roll_2.mp3
      hubcap1.mp3
      hubcap1a.mp3
      hubcap2.mp3
      hubcap2a.mp3
      hubcap3.mp3
      hubcap3a.mp3
      human_animals1.mp3
      human_animals2.mp3
      human_animals3.mp3
      impulse_1.mp3
      impulse_2.mp3
      impulse1.mp3
      impulse1a.mp3
      impulse2.mp3
      impulse2a.mp3
      impulse3.mp3
      impulse4.mp3
      iron_bell1.mp3
      iron_bell2.mp3
      iron_bell3.mp3
      iron_bell4_fast_harmonics.mp3
      iron_slice1.mp3
      iron_slice2.mp3
      iron_slice3.mp3
      jaw-harp1.mp3
      jaw-harp2.mp3
      jaw-harp3.mp3
      jaw-harp4.mp3
      jug_1.mp3
      jug_2.mp3
      Kalimba_1.mp3
      Kalimba_2.mp3
      Kalimba_3.mp3
      Kalimba_4.mp3
      kalimba1.mp3
      kalimba2.mp3
      kalimba3.mp3
      kalimba4.mp3
      kalimba5.mp3
      kaos_1.mp3
      kaos_2.mp3
      kaos_pad_1.mp3
      kaos_pad_2.mp3
      kaos_pad_3.mp3
      key_jingle_1.mp3
      key_on_metal_1.mp3
      key_on_metal_2.mp3
      keyring_1.mp3
      keyring_2.mp3
      keys_1.mp3
      keys_1a.mp3
      keys_2.mp3
      keys1.mp3
      keys2.mp3
      khaen_honk_1.mp3
      khaen_honk_2.mp3
      khaen_lo_1.mp3
      khaen_lo_2.mp3
      kick1.mp3
      kick2.mp3
      kicking_dumpster_huge1.mp3
      kicking_dumpster_huge2.mp3
      kicking_dumpster1.mp3
      kicking_dumpster2.mp3
      kickstand_1.mp3
      kickstand_2.mp3
      kickstand_3.mp3
      knife_sharpen_1.mp3
      knife_sharpen_2.mp3
      knife1.mp3
      knife2.mp3
      knife3.mp3
      knifesharpener1.mp3
      knifesharpener2.mp3
      krinkle_plastic_1.mp3
      krinkle_plastic_2.mp3
      lamp_flex_1.mp3
      laramin_1.mp3
      laramin_2.mp3
      larsontone_1.mp3
      laser_1.mp3
      laser_2.mp3
      laser_3.mp3
      laser_gun_1.mp3
      lath_1.mp3
      lath_2.mp3
      laughing_crowd.mp3
      laughter_1.mp3
      layered_pad_1.mp3
      Leader_tape_friction.mp3
      Leader_tape_friction2.mp3
      Leader_tape_friction3.mp3
      Leader_tape_friction4.mp3
      lettuce_1.mp3
      lettuce_2.mp3
      liddrop1.mp3
      liddrop2.mp3
      lidhit1.mp3
      lidhit2.mp3
      lid-noise1.mp3
      lid-noise2.mp3
      lid-noise3.mp3
      light_bulb_in_pot_1.mp3
      light_bulb_in_pot_2.mp3
      light_bulp_scrape_1.mp3
      lip_bubbling_1.mp3
      lip_bubbling_2.mp3
      locker_1.mp3
      locker_2.mp3
      locker_hit_1.mp3
      locker_hit_2.mp3
      locker1.mp3
      locker2.mp3
      locker3.mp3
      lockersqueak.mp3
      lockersqueak1.mp3
      lockersqueak2.mp3
      lockersqueak2d.mp3
      lockersqueak3.mp3
      Longsynth1.mp3
      Longsynth2.mp3
      Longsynth3.mp3
      Longsynth4.mp3
      Longsynth5.mp3
      Longsynth6.mp3
      LOUDmetal_bars1.mp3
      LOUDmetal_bars2.mp3
      loudmotor1.mp3
      loudmotor2.mp3
      loudmotor3.mp3
      low_Metalichit2.mp3
      machinedrill1.mp3
      machinedrill2.mp3
      madgong.mp3
      malevoice_aa_A2.mp3
      malevoice_aa_A3.mp3
      malevoice_aa_Ab4.mp3
      malevoice_aa_C#4.mp3
      malevoice_aa_C3.mp3
      malevoice_aa_F4.mp3
      malevoice_oo_A2.mp3
      malevoice_oo_A3.mp3
      malevoice_oo_A4.mp3
      malevoice_oo_C3.mp3
      malevoice_oo_D#4.mp3
      malevoice_oo_F3.mp3
      malevoice_oo_F4.mp3
      malevoice_oo_G2.mp3
      malevoices_aa2_A2.mp3
      malevoices_aa2_C#4.mp3
      malevoices_aa2_C3.mp3
      malevoices_aa2_F3.mp3
      malevoices_aa2_F4.mp3
      malevoices_oo2_A2.mp3
      malevoices_oo2_A3.mp3
      malevoices_oo2_A4.mp3
      malevoices_oo2_C#4.mp3
      malevoices_oo2_C3.mp3
      malevoices_oo2_F3.mp3
      malevoices_oo2_F4.mp3
      man_yelling_1.mp3
      man_yelling_2.mp3
      map_jiggle_1.mp3
      map_jiggle_2.mp3
      marble_drop1.mp3
      marble_drop1.wav_09.35.mp3
      marble_drop2.mp3
      marble_rub.mp3
      marble_spin.mp3
      marbles1.mp3
      marbles2.mp3
      marimba_nonsense_1.mp3
      martin_sounds_1.mp3
      maybe_a_fryingpan1.mp3
      maybe_a_fryingpan2.mp3
      mcbridetone_1.mp3
      measuring_tape_1.mp3
      measuring_tape_2.mp3
      metal_1.mp3
      metal_2.mp3
      metal_bars1.mp3
      metal_bars2.mp3
      metal_bars3.mp3
      metal_beam_hit1.mp3
      metal_beam_hit2.mp3
      metal_beam_hit3.mp3
      metal_beat_1.mp3
      metal_beat_2.mp3
      metal_bell.mp3
      metal_container_hit1.mp3
      metal_container_hit2.mp3
      metal_creamer_with_water_hit1.mp3
      metal_creamer_with_water_hit2.mp3
      metal_debris_1.mp3
      metal_disk_hit.mp3
      metal_drop_1.mp3
      metal_dub_hit1.mp3
      metal_dub_hit2.mp3
      metal_hit_1.mp3
      metal_hit_2.mp3
      metal_hit_3.mp3
      metal_hit_short1.mp3
      metal_hit_short2.mp3
      metal_hit_short3.mp3
      metal_hits-light.mp3
      metal_lid_drop1.mp3
      metal_lid_drop2.mp3
      metal_lid_drop3.mp3
      metal_lid1.mp3
      metal_lid2.mp3
      metal_light_1.mp3
      metal_light_2.mp3
      Metal_on_the_ground_1.mp3
      Metal_on_the_ground_2.mp3
      Metal_on_the_ground_3.mp3
      metal_on_the_ground_4.mp3
      metal_pot_1.mp3
      metal_pot_2.mp3
      metal_rattle_1.mp3
      metal_rattle_1a.mp3
      metal_reverb_hit1.mp3
      metal_reverb_hit2.mp3
      metal_reverb_hit3.mp3
      metal_ring1.mp3
      metal_ring2.mp3
      metal_roll_heavy_1.mp3
      metal_roll_soft_1.mp3
      metal_scrape.mp3
      metal_scrape1.mp3
      metal_scrape2.mp3
      metal_scrape3.mp3
      metal_scrape4.mp3
      metal_shake_1.mp3
      metal_sharp1.mp3
      metal_sharp2.mp3
      metal_sharp3.mp3
      metal_sheet_hit1.mp3
      metal_sheet_hit2.mp3
      metal_spinning1.mp3
      metal_spinning2.mp3
      metal_spinning3.mp3
      metal_stick_hit1.mp3
      metal_stick_hit2.mp3
      metal_strike1.mp3
      metal_strike2.mp3
      metal_strike3.mp3
      metal_strike4.mp3
      metal_swirl1.mp3
      metal_swirl2.mp3
      metal_swirl3.mp3
      metal_trashcan_1.mp3
      metalhit.mp3
      metalhit2.mp3
      metallic_shake1.mp3
      metallic_shake2.mp3
      metallic_shake3.mp3
      metallic_squeek1.mp3
      metallic_squeek2.mp3
      metallic_squeek3.mp3
      metallic_tinkle.mp3
      metalpipe_clunks1.mp3
      metalpipe_clunks2.mp3
      metalrumble.mp3
      metalscrape1.mp3
      metalscrape2.mp3
      metalscrape3.mp3
      metalscrape4short.mp3
      metalsqueek.mp3
      mic_stand_1.mp3
      mic_stand_2.mp3
      mic_stand_squeaking_2.mp3
      mintone_!.mp3
      mintone_2.mp3
      misc_1.mp3
      misc_click_1.mp3
      misc_click_2.mp3
      misc_clicks_1.mp3
      misc_clicks_2.mp3
      misc_hit_1.mp3
      misc_hit_2.mp3
      misc_hit_3.mp3
      misc_perc_1.mp3
      misc_perc_2.mp3
      mixing_cards.mp3
      modern_phone1.mp3
      modern_phone2.mp3
      modulator1.mp3
      modulator2_morehighs.mp3
      molinaritone_1.mp3
      monsteramin_1.mp3
      monsteramin_2.mp3
      mooo1.mp3
      mooo2.mp3
      moremarbles.mp3
      moremetal.mp3
      mortar+pestle.mp3
      mortar+pestle2.mp3
      motor_1.mp3
      motor_1a.mp3
      motor_2.mp3
      motor_2a.mp3
      mouth_bubbles_1.mp3
      mouth_bubbles_2.mp3
      mouth_harp1.mp3
      mouth_harp2.mp3
      mouth_harp3.mp3
      mouth_harp4.mp3
      mouth_loop_1.mp3
      mouth_loop_2.mp3
      mouth_pop_1.mp3
      mouth_pop_1a.mp3
      mouth_pop_2.mp3
      mouth_pop_2a.mp3
      mouthnoises1.mp3
      mouthnoises2.mp3
      mouthpiece1.mp3
      mouthpiece2.mp3
      moving_bricks1.mp3
      moving_bricks2.mp3
      moving_debris_noise.mp3
      moving_furniture_1.mp3
      multi_layered_sample_1.mp3
      murphytone_1.mp3
      music_box_tone_1.mp3
      music_box_tone_2.mp3
      music_box_tone_3.mp3
      music_box_tone_4.mp3
      music_box1.mp3
      music_box1a.mp3
      music_box2.mp3
      music_box2-hasclipping.mp3
      music_box3.mp3
      naildrop1.mp3
      naildrop2.mp3
      naildrop3.mp3
      nails.mp3
      nails_rolling.mp3
      nails_rolling2.mp3
      NaturalReverbHit.mp3
      noise_shover1.mp3
      noise_shover2.mp3
      noise_shover3.mp3
      oily_theremin_1.mp3
      oily_theremin_2.mp3
      old_door_1.mp3
      old_door_2.mp3
      old_phone1.mp3
      old_phone2.mp3
      old_phone3.mp3
      outdoors_1.mp3
      outside_boston_conservatory.mp3
      outside_churchbells.mp3
      packing_tape1.mp3
      packing_tape2.mp3
      packingtape1.mp3
      packingtape2.mp3
      packingtape3.mp3
      pan_hit_1.mp3
      pan_hit_2.mp3
      pan_pot_lid1.mp3
      pan_pot_lid2.mp3
      pan_pot_lid3.mp3
      pan_pot_lid4.mp3
      pan_pot1.mp3
      pan_pot2.mp3
      pan_pot3.mp3
      pan_pot4.mp3
      paper_bag.mp3
      paper_crumple_1.mp3
      paper_crumple_2.mp3
      paper_cuts_1.mp3
      paper_cuts_2.mp3
      paper_fan_1.mp3
      paper_fan_2.mp3
      paper_rip1.mp3
      paper_rip2.mp3
      paper_rip3.mp3
      pebbles_in_a_box1.mp3
      pebbles_in_a_box2.mp3
      pebbles_in_a_box3.mp3
      pebbles_in_a_box4.mp3
      pebbles_in_hands.mp3
      peeing_in_can_1.mp3
      peeing_in_can_2.mp3
      peel_1.mp3
      peel_2.mp3
      pencil_and_pennies_!.mp3
      pencil_and_pennies_2.mp3
      pencil_scrape_1.mp3
      pencil_scrape_2.mp3
      pencil_sharpener_1.mp3
      pencil_sharpener1.mp3
      pencil_sharpener2.mp3
      pencil_sharpener3.mp3
      pencil_tick_1.mp3
      pencil_tick_2.mp3
      pennies1.mp3
      pennies2.mp3
      pez_dispenser_1.mp3
      phone_card_1.mp3
      piano_Ab4.mp3
      piano_B4.mp3
      piano_C2.mp3
      piano_chord.mp3
      piano_D4.mp3
      piano_Db6.mp3
      piano_E2.mp3
      piano_Eb3.mp3
      piano_Eb5.mp3
      piano_F#3.mp3
      piano_G2.mp3
      piano_G6.mp3
      piano_hit.mp3
      piano_hit_1.mp3
      piano_hit_1a.mp3
      piano_hit_2.mp3
      piano_hit_2a.mp3
      piano_hit_3.mp3
      piano_hit2.mp3
      piano_low.mp3
      piano_low_rhythmicloop.mp3
      piano_pad_1.mp3
      piano_pad_2.mp3
      piano_pad_3.mp3
      piano_pad_4.mp3
      piano_strings_1.mp3
      piano_strings_2.mp3
      picture.mp3
      pig_impression_1.mp3
      pillrattle1.mp3
      pillrattle2.mp3
      pillrattle3.mp3
      pillrattle4.mp3
      pinecone_1.mp3
      pinecone_2.mp3
      ping_1.mp3
      ping_2.mp3
      ping_pong_1.mp3
      ping_pong_2.mp3
      ping_pong_3.mp3
      ping_pong_shake_1.mp3
      ping_pong_shake_3.mp3
      ping_pong_shake-2.mp3
      ping_pong_solo_1.mp3
      ping_pong_solo_2.mp3
      ping1.mp3
      ping2.mp3
      ping3.mp3
      pins1.mp3
      pins2.mp3
      pins3.mp3
      pins4.mp3
      pins5.mp3
      pipe_drag_1.mp3
      pipe_drag_2.mp3
      pipe_drag_3.mp3
      pipe_hit_1.mp3
      pipe_reso_1.mp3
      pipe_reso_2.mp3
      pipe_thump1.mp3
      pipe_thump2.mp3
      pipe_thump3.mp3
      pitched_Metalichit1.mp3
      plastic_accordian_1.mp3
      plastic_accordian_2.mp3
      plastic_bottle_1.mp3
      plastic_bottle_1c.mp3
      plastic_bottle_2.mp3
      plastic_bottle_2c.mp3
      plastic_bottle_3.mp3
      plastic_bottle_pop1.mp3
      plastic_bottle_pop2.mp3
      plastic_bottle_pop3.mp3
      plastic_bottle_stairs_1.mp3
      plastic_box_1.mp3
      plastic_denim_2.mp3
      plastic_flick_1.mp3
      plastic_flick_2.mp3
      plastic_hit1.mp3
      plastic_hit2.mp3
      plastic_jeans_1.mp3
      plastic_metal_scrape_1.mp3
      plastic_metal_scrape_2.mp3
      plastic_rattle_1.mp3
      plastic_rattle_2.mp3
      plastic_scraatch_2.mp3
      plastic_shake_1.mp3
      plastic_shake_2.mp3
      plastic_sheet_1.mp3
      plastic_sheet_2.mp3
      plastic_squeak_1.mp3
      plastic_squeak_1a.mp3
      plastic_squeak_1b.mp3
      plastic_squeak_2.mp3
      plastic_vibration_1.mp3
      plastic_vibration_2.mp3
      plastic_vibration_3.mp3
      Pling1.mp3
      Pling2.mp3
      Pling3.mp3
      pluck_1.mp3
      pluck_1c.mp3
      pluck_2.mp3
      pluck_ruler_1.mp3
      pluck_ruler_2.mp3
      plucked_reed_1.mp3
      plucked_reed_2.mp3
      police_siren1.mp3
      police_siren2.mp3
      pop_rocks_1.mp3
      pop_rocks_2.mp3
      pouring_soda1.mp3
      pouring_soda2.mp3
      powerdrill1.mp3
      powerdrill2.mp3
      powerdrill3.mp3
      powertool_harmonic2.mp3
      powertool_harmonics1.mp3
      powertool_harmonics3.mp3
      powertool_long.mp3
      prep_piano_C0_1.mp3
      prep_piano_C0_2.mp3
      prep_piano_hit1.mp3
      prep_piano_hit2.mp3
      prep_piano_hit3.mp3
      prep_piano_hit4.mp3
      prep_pianoC1_1.mp3
      prep_pianoC1_2.mp3
      prep_pianoC2_1.mp3
      prep_pianoC2_2.mp3
      prep_pianoC4.mp3
      prep_pianoC5.mp3
      prep_pianoD#4.mp3
      prep_pianoE0_1.mp3
      prep_pianoE0_2.mp3
      prep_pianoE1.mp3
      prep_pianoE2.mp3
      prep_pianoE4.mp3
      prep_pianoF3.mp3
      prep_pianoG#0.mp3
      prep_pianoG#1.mp3
      prep_pianoG#2.mp3
      prep_pianoG#3.mp3
      print_1.mp3
      pumpkin_1.mp3
      pumpkin_2.mp3
      pumpkin_3.mp3
      pvc_1.mp3
      pvc_2.mp3
      quack_1.mp3
      quack_2.mp3
      radiator_1.mp3
      radiator_1a.mp3
      radiator_2.mp3
      radiator_long_2.mp3
      radiator_long-1.mp3
      rail_hit_1.mp3
      rail_hit_2.mp3
      rail_hit_3.mp3
      rail_scrape_1.mp3
      rain_1.mp3
      rain_white_noise_1.mp3
      rain+thunder1.mp3
      rain+thunder2.mp3
      rain+thunder3.mp3
      rainstick.mp3
      rainstick_1.mp3
      rainstick_2.mp3
      rainstick1.mp3
      rainstick2.mp3
      rainstick2d.mp3
      random_analogsynth1.mp3
      random_analogsynth2.mp3
      random_analogsynth3.mp3
      random_perc_1.mp3
      random_perc_2.mp3
      ratchet.mp3
      ratchet1.mp3
      ratchet2.mp3
      ratchet2_loud.mp3
      ratchet3.mp3
      rattle_1.mp3
      rattle_2.mp3
      rattle_3.mp3
      rattle_metal1.mp3
      rattle_metal2.mp3
      rattle_metal3.mp3
      rattle_metal4.mp3
      rattle_metal5.mp3
      README.md
      rebel_yell_1.mp3
      recorder_harmonics1.mp3
      recorder_harmonics2.mp3
      recorder_harmonics3.mp3
      red_bul_2.mp3
      red_bull_1.mp3
      reso_atmosphere_1.mp3
      reso_bass_1.mp3
      reso_bass_2.mp3
      reso-hit1.mp3
      Resonant_FM_laser1.mp3
      Resonant_FM_laser2.mp3
      Resonant_FM_laser3.mp3
      resonating_harmonics_1.mp3
      resonating_harmonics_2.mp3
      resonating_harmonics_3.mp3
      resonating_harmonics_4.mp3
      reverb_bang_1.mp3
      reverb_clap1.mp3
      reverb_clap2.mp3
      reverb_clap3.mp3
      reverb_clap4.mp3
      reverb_double_bass1.mp3
      reverb_double_bass2.mp3
      reverbslap1.mp3
      reverbslap2.mp3
      ribbed_tube_1.mp3
      ribbed_tube_2.mp3
      rice_1.mp3
      rice_in_can_1.mp3
      rice_in_container_1.mp3
      rice_shaving_cream_1.mp3
      ring1.mp3
      ring2.mp3
      rip_1.mp3
      rip_2.mp3
      rip_3.mp3
      ripping_styrofoam1.mp3
      ripping_styrofoam2.mp3
      ripping_styrofoam3.mp3
      ritz_1.mp3
      ritz_2.mp3
      ritz_tambourine_1.mp3
      ritz_tambourine_2.mp3
      ritz_tambourine_3.mp3
      river.mp3
      roland_circuit_1.mp3
      roland_circuit_2.mp3
      roll_1.mp3
      roll_1a.mp3
      roll_2.mp3
      roll_2a.mp3
      roll_3.mp3
      roll_3a.mp3
      roll_4.mp3
      rolling_3.mp3
      rolling_4.mp3
      rolling_5.mp3
      rolling_6.mp3
      rolling_bafle_!.mp3
      rolling_coins1.mp3
      rolling_coins2.mp3
      rolling_nails1.mp3
      rolling_nails2.mp3
      rolling_trashcan.mp3
      rope_swish1.mp3
      rope_swish2.mp3
      rope_swish3.mp3
      rotating_iron1.mp3
      rotating_iron2.mp3
      rubber_1.mp3
      rubber_2.mp3
      rubber_band1.mp3
      rubber_band2.mp3
      rubber_toy_short1.mp3
      rubber_toy_short2.mp3
      rubber_toy_short3.mp3
      rubber_toy_short4.mp3
      rubber_toy_short5.mp3
      rubber_toy1.mp3
      rubber_toy2.mp3
      rubberband_1.mp3
      rubberband_bass1.mp3
      rubberband_bass2.mp3
      rubberband_bass3.mp3
      rubberband_bass4.mp3
      rubberband_bass5.mp3
      rubberband_bass6.mp3
      rubberband_bass7.mp3
      rubberband1.mp3
      rubberband2.mp3
      ruler_guitar_1.mp3
      ruler_guitar_2.mp3
      ruler_guitar_3.mp3
      running_water_1.mp3
      runningEcho1_short.mp3
      runningEcho2_long.mp3
      sand_bag_1.mp3
      sandbag_2.mp3
      sawing1.mp3
      sawing2.mp3
      sax_reed_2.mp3
      sax_reed_3.mp3
      sax_reed_squeak_1.mp3
      scifi_synth_tritones1.mp3
      scifi_synth_tritones2.mp3
      scifi_synth_tritones3.mp3
      scifi_synth_tritones4.mp3
      scifi_synth_tritones5.mp3
      scifi_synth_tritones6.mp3
      scissor_hh_1.mp3
      scissor_hh_2.mp3
      scissor_rhythm_1.mp3
      scotch_tape1.mp3
      scotch_tape2.mp3
      scotch_tape3.mp3
      scrabble_jar_1.mp3
      scrabble_jar_2.mp3
      scrabble_tiles_1.mp3
      scrabble_tiles_2.mp3
      scrape_1.mp3
      scrape_2.mp3
      scraping_metal_edge1.mp3
      scraping_metal_edge2.mp3
      scraping1.mp3
      scraping2-tiles.mp3
      scrapingstick1.mp3
      scrapingstick2.mp3
      scrapingstick3.mp3
      scratching1.mp3
      scratching2.mp3
      scratching3.mp3
      scream.mp3
      scream_1.mp3
      scream_2.mp3
      scream_twist_1.mp3
      scream_twist_2.mp3
      screw_1.mp3
      screw_2.mp3
      shaker_1.mp3
      shaker_1a.mp3
      shaker_2.mp3
      shaker_slow_1.mp3
      shaker1.mp3
      shaker2.mp3
      shaker3.mp3
      shaker4.mp3
      shaker5.mp3
      shaker6.mp3
      shaker7.mp3
      shaker8.mp3
      shaker9.mp3
      shakers_filtered.mp3
      shakers_filtered2_fromsametrack.mp3
      shakers_filtered3_fromsametrack.mp3
      shaking_caps1.mp3
      shaking_caps2.mp3
      shaking_spring_reverb1.mp3
      shaking_spring_reverb2.mp3
      shaver_1.mp3
      shaver_2.mp3
      shaver_in_can_1.mp3
      shaver_in_can_2.mp3
      shaver_paint_can_1.mp3
      shaver1.mp3
      shaver2.mp3
      shaver3.mp3
      shaving_cream_!.mp3
      shaving_cream_cuisanart_1.mp3
      sheet_plate_rumble.mp3
      shimmer_1.mp3
      shoes_in_gravel.mp3
      shopping_cart_1.mp3
      short_metal_hit1.mp3
      short_metal_hit2.mp3
      short_metal_hit3.mp3
      shortscrape1.mp3
      shortscrape2.mp3
      Shortsynth_high.mp3
      Shortsynth_low.mp3
      Shortsynth_mid.mp3
      Shortsynth_mid2.mp3
      Shortsynth_mid3.mp3
      shower.mp3
      shredder_1.mp3
      shredder_2.mp3
      sitar1.mp3
      sitar2.mp3
      sitar3.mp3
      sitar4.mp3
      sitar5.mp3
      sitar6.mp3
      Slam(loud).mp3
      Slam(Med).mp3
      Slam(soft).mp3
      slam_1.mp3
      slam_2.mp3
      slam1.mp3
      slam1d.mp3
      slam2.mp3
      slam2d.mp3
      slam3.mp3
      slam4.mp3
      slide_whistle_down_1.mp3
      slide_whistle_down_2.mp3
      slide_whistle_up_1.mp3
      slide_whistle_up_2.mp3
      slingshot_1.mp3
      slinky_roll_1.mp3
      slinky_roll_2.mp3
      slinky_trashcan_lid_1.mp3
      slinky1.mp3
      slinky2.mp3
      slinky3.mp3
      small_car1.mp3
      small_car2.mp3
      small_metal_hit1.mp3
      small_metal_hit1a.mp3
      small_metal_hit2.mp3
      small_metal_hit2a.mp3
      small_metal_hit3.mp3
      small_wood_crash1.mp3
      small_wood_crash2.mp3
      smalltemplebell.mp3
      smalltemplebell2.mp3
      snare_brush_1.mp3
      snare_brush_2.mp3
      snare_brush_3.mp3
      snow_globe_1.mp3
      snow_globe_2.mp3
      sodaCanCrunch1.mp3
      sodaCanCrunch2_short.mp3
      sodaCanCrunch3_loudShort.mp3
      sodaCanRoll1.mp3
      sodaCanRoll2_short.mp3
      SOFTmetal_bars.mp3
      sorkinamin_1.mp3
      sorkinamin_2.mp3
      sorkinamin_3.mp3
      sound_collage_1.mp3
      sound_collage_2.mp3
      space_rubberband_1.mp3
      space_rubberband_2.mp3
      spaceship_takeoff1.mp3
      spaceship_takeoff2.mp3
      spin_1.mp3
      spin_2.mp3
      spin_cym1.mp3
      spin_cym2.mp3
      spin_cym3.mp3
      spinning_large_coin.mp3
      spinningpin.mp3
      spinningplate1.mp3
      spinningplate2.mp3
      spinningroll1.mp3
      spinningroll2.mp3
      spit_1.mp3
      spitting_2.mp3
      spray_air_1.mp3
      spray_air_2.mp3
      spray_air_3.mp3
      spring_1.mp3
      spring_2.mp3
      sprinkler_1.mp3
      sprinkler_1a.mp3
      sprinkler_head_1.mp3
      squeak_1.mp3
      squeak_1a.mp3
      squeak_1c.mp3
      squeak_2.mp3
      squeak_2a.mp3
      squeak_2c.mp3
      squeak_3.mp3
      squeak_3c.mp3
      squeak1.mp3
      squeak1d.mp3
      squeak2.mp3
      squeak2d.mp3
      squeak3.mp3
      squeak4.mp3
      squeaking_long.mp3
      squeaking_melodic.mp3
      squeaking_melodic2.mp3
      squeaking_melodic3.mp3
      squeaks.mp3
      squeaks2_short.mp3
      squeaky_music_stand1.mp3
      squeaky_music_stand2.mp3
      squeaky_music_stand3.mp3
      squeal_1.mp3
      squeel1.mp3
      squeel2.mp3
      squeezing_styrofoam.mp3
      squelching.mp3
      squiggy_perhaps-someone-chewing.mp3
      stairs+metal1.mp3
      stairs+metal2.mp3
      stairs+sticks1.mp3
      stairs+sticks2.mp3
      stairs+sticks3.mp3
      stand_squeak_1.mp3
      stapler_spring_1.mp3
      stapler_spring_2.mp3
      steel_balls_plastic_1.mp3
      stick_beads1.mp3
      stick_beads2.mp3
      stick_beads3.mp3
      stick_beads4.mp3
      sticks_1.mp3
      stomp_train_station1.mp3
      stomp_train_station2.mp3
      stomp_train_station3.mp3
      stomp_up_stairs_1.mp3
      stone_on_wall_scratching.mp3
      stone1.mp3
      stone2.mp3
      stone3.mp3
      stool_1.mp3
      stool_2.mp3
      stool_3.mp3
      stopwatch.mp3
      storm_water_1.mp3
      storm_water_2.mp3
      strange_loop.mp3
      straw1.mp3
      straw2.mp3
      street_beat_1.mp3
      street_noise_1.mp3
      street_perc_1.mp3
      street_perc_2.mp3
      string_pad_1.mp3
      string_pad_2.mp3
      string_pad_3.mp3
      string_rattle_1.mp3
      string_rattle_2.mp3
      styrofoamnoises1.mp3
      styrofoamnoises2.mp3
      styrofoamnoises3.mp3
      sub_1.mp3
      sub_2.mp3
      subwayTrain_B-line.mp3
      surgical_tape_dispenser_1.mp3
      surgical_tape_dispenser_2.mp3
      swimming1.mp3
      swimming2.mp3
      swimming3.mp3
      swimming4.mp3
      swirling_pins_1.mp3
      swirling_pins_2.mp3
      swish+spin1.mp3
      swish+spin2.mp3
      swoosh1.mp3
      swoosh2.mp3
      sword_1.mp3
      sword_2.mp3
      syn_bass_1.mp3
      syn_bass_2.mp3
      syn_bass_3.mp3
      syn_brass_1.mp3
      syn_brass_2.mp3
      syn_vox_1.mp3
      syn_vox_2.mp3
      synth_bubbles1.mp3
      synth_bubbles2.mp3
      synth_computer_fax1.mp3
      synth_computer_fax2.mp3
      synth_computer_fax3.mp3
      synth_computer_fax4.mp3
      synth_computer_fax5.mp3
      synth_computer_long.mp3
      synth_crash1.mp3
      synth_crash2.mp3
      synth_crash3.mp3
      synth_crash4.mp3
      synth_detuned1.mp3
      synth_detuned2_long.mp3
      synth_detuned3.mp3
      synth_filter1.mp3
      synth_filter2.mp3
      synth_glassy_spin.mp3
      synth_in_5ths1.mp3
      synth_in_5ths2.mp3
      synth_in_5ths3.mp3
      synth_in_5ths4.mp3
      synth_in_5ths5.mp3
      synth_in_5ths6.mp3
      synth_in_5ths7.mp3
      synth_in_5ths8.mp3
      synth_in_5ths9.mp3
      synth_in_minor_thirds1.mp3
      synth_in_minor_thirds2.mp3
      synth_in_minor_thirds3.mp3
      synth_in_minor_thirds4.mp3
      synth_in_minor_thirds5.mp3
      synth_in_minor_thirds6.mp3
      synth_in_minor_thirds7_faded.mp3
      synth_jungle_long_1.mp3
      synth_laser1.mp3
      synth_laser2.mp3
      synth_laser3.mp3
      synth_laser4.mp3
      synth_orch1.mp3
      synth_orch2.mp3
      synth_orch3.mp3
      synth_rumble_low.mp3
      synth_rumble_low2.mp3
      synth_siren1.mp3
      synth_siren2.mp3
      synth_siren3_long.mp3
      synth_siren4_short.mp3
      synth_warp_core1.mp3
      synth_warp_core2.mp3
      synth_warp_core3.mp3
      synthArp1.mp3
      synthArp2.mp3
      synthdrone_long.mp3
      synthdrone_octave1.mp3
      synthdrone_octave2.mp3
      synthdrone_octave3.mp3
      synthdrone_octave4.mp3
      synthdrone_octave5.mp3
      synthdrone_octave6.mp3
      tabla_1.mp3
      tabla_2.mp3
      tambourine1.mp3
      tambourine2.mp3
      tambourine3.mp3
      tangle_toy1.mp3
      tangle_toy2.mp3
      tape_1.mp3
      tape_1a.mp3
      tape_3.mp3
      tape_ball_1.mp3
      tape_measure_1.mp3
      tape_measure_2.mp3
      tape_measure1.mp3
      tape_measure2.mp3
      tape_measure3.mp3
      tape_measure4.mp3
      tape_measure5.mp3
      tape_measure6.mp3
      tape_pull_1.mp3
      tape_shake_1.mp3
      tape_shake_2.mp3
      tapping1.mp3
      tapping2.mp3
      taps_1.mp3
      taps_1a.mp3
      taps_1c.mp3
      taps_2.mp3
      tearing_cloth1.mp3
      tearing_cloth2.mp3
      tearing_cloth3.mp3
      tearing_cloth4.mp3
      tearing_cloth5.mp3
      tearing_cloth6.mp3
      tearing_cloth7.mp3
      tearing_cloth8.mp3
      tearing_cloth9.mp3
      techno_sequence1.mp3
      techno_sequence2.mp3
      techno_sequence3.mp3
      templebell1.mp3
      templebell2.mp3
      templebell3.mp3
      tennis_ball.mp3
      theremin_fly_2.mp3
      theremin_fly_3.mp3
      theremin_low_1.mp3
      theremin_low_2.mp3
      theremin_octave_1.mp3
      theremin_octave_2.mp3
      theremin_orchestra_1.mp3
      theremin_orchestra_2.mp3
      theremin_reverb_1.mp3
      theremin_reverb_2.mp3
      theremin_vocal_1.mp3
      theremin_vocal_2.mp3
      theremin_wow_1.mp3
      theremin_wow_2.mp3
      thisIsTheSoundOfAVocoder.mp3
      thread_1.mp3
      thread_2.mp3
      thud_1.mp3
      thumb_roll_1.mp3
      thumb_roll_2.mp3
      thump1.mp3
      thump2.mp3
      thunder_drum_1.mp3
      thunder_drum_2.mp3
      thunder_drum_long_1.mp3
      thunder1.mp3
      thunder2.mp3
      thunder3.mp3
      tiger_flashlight_1.mp3
      tiger_flashlight_2.mp3
      Tile_pecking1.mp3
      Tile_pecking2.mp3
      timbale_glitch_1.mp3
      timbale_glitch_2.mp3
      tin_can_1.mp3
      tin_can_2.mp3
      tin_foil_long_1.mp3
      tin_foil_long_2.mp3
      tincan1.mp3
      tincan2.mp3
      tincan3.mp3
      tinfoil_shaken1.mp3
      tinfoil_shaken2.mp3
      ting_1.mp3
      ting_2.mp3
      tinkle_1.mp3
      tinkle_2.mp3
      tinkle1.mp3
      tinkle2.mp3
      tinkle3.mp3
      tinkle4.mp3
      tinklingchain1LONG.mp3
      tinklingchain2SHORT.mp3
      tiny_bell.mp3
      tiny_bell2.mp3
      tinybell1.mp3
      tinybell2.mp3
      tinybell3.mp3
      tinybell4.mp3
      tinybell5.mp3
      tire_squeal_long_1.mp3
      tire_squeal_long_2.mp3
      tissue_1.mp3
      tissue_2.mp3
      toaster_1.mp3
      toaster_2.mp3
      tongue_flutter_1.mp3
      tongue_flutter_2.mp3
      tongue_flutter_3.mp3
      toothbrush_didgeridoo1.mp3
      toothbrush_didgeridoo2.mp3
      toothbrush_on_metal_1.mp3
      toy_plane_1.mp3
      toy_Plane_2.mp3
      toy_truck_1.mp3
      toy_truck_2.mp3
      toy_whistle_1.mp3
      toy_whistle_2.mp3
      toy_whistle_long_1.mp3
      Train.mp3
      train_brakes_1.mp3
      train_passing_1.mp3
      train_passing_2.mp3
      train1.mp3
      train2.mp3
      train3.mp3
      trash_can_1.mp3
      trash_can_2.mp3
      trash_drum_1.mp3
      trash_drum_2.mp3
      trashcan_drag1.mp3
      trashcan_drag2.mp3
      Trashcan_hit1.mp3
      Trashcan_hit2.mp3
      trashcan_hit11.mp3
      trashcan_hit12.mp3
      Trashcan_resonant_hit1.mp3
      Trashcan_resonant_hit2.mp3
      Trashcan_resonant_hit3.mp3
      Trashcan1.mp3
      Trashcan2.mp3
      Trashcandragging.mp3
      Trashcandragging2.mp3
      trunk_1.mp3
      trunk_2.mp3
      truvan_1.mp3
      truvan_2.mp3
      tube_drop1.mp3
      tube_drop1a.mp3
      tube_drop2.mp3
      tube_drop2a.mp3
      tube_drop3.mp3
      tube_drop4.mp3
      tube_resonant_long.mp3
      tube_resonant_long2.mp3
      tube_resonant_short1.mp3
      tube_resonant_short2.mp3
      tubeblowing.mp3
      tubeblowing2.mp3
      tuning_fork.mp3
      turning_pages_1.mp3
      turning_pages_2.mp3
      turning_peg_1.mp3
      turning_peg_2.mp3
      twangs_1.mp3
      twangs_2.mp3
      twirl_1.mp3
      ufo_fly_by1.mp3
      ufo_fly_by2.mp3
      ufo_fly_by3.mp3
      umbrella_1.mp3
      umbrella_2.mp3
      underground_bang-VERYcompressed.mp3
      underground_train.mp3
      underground_train2.mp3
      underground-ambience.mp3
      up_down_vocals_1.mp3
      up_stairs_1.mp3
      up_stairs_2.mp3
      vacuum_1.mp3
      vacuum_2.mp3
      vacuum_rev_1.mp3
      vacuum_rev_2.mp3
      velcro_1.mp3
      velcro_1c.mp3
      velcro_2.mp3
      velcro1.mp3
      velcro2.mp3
      vibra_clang_1.mp3
      vibra_clang_2.mp3
      vibra_drag_1.mp3
      vinly_flex_1.mp3
      vinyl_hit_1.mp3
      vinyl_hit_2.mp3
      violent_goove_2.mp3
      violent_groove_1.mp3
      violent_groove_4.mp3
      violin_bounce1.mp3
      violin_bounce2.mp3
      violin_bounce3.mp3
      violin_scratch1.mp3
      violin_scratch2.mp3
      violin_strange1.mp3
      violin_strange2.mp3
      vocal_buzz_1.mp3
      vocal_hum_1.mp3
      vocal_hum_2.mp3
      vocal_hum_3.mp3
      vocal_synth1.mp3
      vocal_synth2.mp3
      vocal_synth3.mp3
      vocal_synth4_short.mp3
      voclongchord.mp3
      voclongchord2.mp3
      voclongchord3.mp3
      voclongchord4.mp3
      vocoder1.mp3
      vocoder2_short.mp3
      vocoder3.mp3
      vocoder4_long.mp3
      voilent_goove_3.mp3
      wacky_synth1.mp3
      wacky_synth2.mp3
      wacky_synth3.mp3
      wacky_synth4.mp3
      wacky_synth5.mp3
      wacky_synth6.mp3
      wacky_synth7.mp3
      wacky_synth8.mp3
      walking_1.mp3
      walking_2.mp3
      walking_in_dirt.mp3
      walking_in_trainstation.mp3
      walking_on_wood.mp3
      war_drum_1.mp3
      water.mp3
      water_1.mp3
      water_1c.mp3
      water_2.mp3
      water_3.mp3
      water_balloon_1.mp3
      water_balloon_2.mp3
      water_bottle_1.mp3
      water_bottle_2.mp3
      water_bottle_breathe_1.mp3
      water_bottle_breathe_2.mp3
      water_bubbles1.mp3
      water_bubbles2.mp3
      water_bubbles3.mp3
      water_bubbles4.mp3
      water_can_1.mp3
      water_can_2.mp3
      water_glass_1.mp3
      water_glass_2.mp3
      water_glass_3.mp3
      water_hit1.mp3
      water_hit2.mp3
      water_hit3.mp3
      water_hit4.mp3
      water_in_bucket1.mp3
      water_in_bucket2.mp3
      water_in_bucket3.mp3
      water_in_bucket4.mp3
      water_in_sink1.mp3
      water_in_sink2.mp3
      water_in_sink3.mp3
      water_jug_1.mp3
      water_on_tinfoil1.mp3
      water_on_tinfoil2.mp3
      water_pan_1.mp3
      water_pan_1c.mp3
      water_pan_2.mp3
      water_pan_2c.mp3
      water_plunge1.mp3
      water_plunge2.mp3
      water_sizzle_1.mp3
      water_sizzle_2.mp3
      water_swirl1.mp3
      water_swirl2.mp3
      water_tap_long.mp3
      waterbottle_hit1.mp3
      waterbottle_hit2.mp3
      waterbottle_hit3.mp3
      waterbubbles1.mp3
      waterbubbles2.mp3
      waterfall.mp3
      waterpump_electric.mp3
      waterpump_electric2.mp3
      waterpump_electric3.mp3
      watersplash1.mp3
      watersplash2.mp3
      waves_small.mp3
      weird_saw_1.mp3
      wheel_spin_1.mp3
      wheel_spin_2.mp3
      whiff_1.mp3
      whiff_2.mp3
      whip_on_metal_1.mp3
      whip_on_metal_2.mp3
      whirling_wire1.mp3
      whirling_wire2.mp3
      whistle_1.mp3
      whistle_2.mp3
      whistle_3.mp3
      whistle1.mp3
      whistle2.mp3
      whistle3.mp3
      whistlebreath_wtf.mp3
      whistling_tube1.mp3
      whistling_tube2.mp3
      whistling_tube3.mp3
      whistling_tube4.mp3
      whistling_weird1.mp3
      whistling_weird2.mp3
      whistling_weird3.mp3
      whistling_weird4_long.mp3
      whitley_tone_1.mp3
      wild_river.mp3
      wind_chimes_1.mp3
      wind_up_long_1.mp3
      wind_up_toy_1.mp3
      wind_up_toy_2.mp3
      winding_1.mp3
      Window_screen_1.mp3
      Window_screen2.mp3
      windup_toy_1.mp3
      windup_toy_2.mp3
      wine_bottle1.mp3
      wine_bottle2.mp3
      wine_cork1.mp3
      wine_cork2.mp3
      wine_cork3.mp3
      wine_glass_1.mp3
      wine_glass_2.mp3
      wineglass_on_musicstand1.mp3
      wineglass_on_musicstand2.mp3
      wineglass_on_musicstand3.mp3
      wineglasstone1.mp3
      wineglasstone2.mp3
      wineglasstone3.mp3
      wire_spin_1.mp3
      wire_spin_2.mp3
      wirewhisk.mp3
      wirewhisk2.mp3
      wood_ball_in_jar_1.mp3
      wood_box_1.mp3
      wood_box_2.mp3
      wood_pole_1.mp3
      wood_pole_2.mp3
      wood_slap_1.mp3
      wood_slap_2.mp3
      woodblock_pitched-do.mp3
      woodblock_pitched-fa.mp3
      woodblock_pitched-LOWERsol.mp3
      woodblock_pitched-mi.mp3
      woodblock_pitched-sol.mp3
      woodblock_pitched-ti.mp3
      woodblocks_supposedly_1.mp3
      woodblocks_supposedly_2.mp3
      wooden_clap1.mp3
      wooden_clap2.mp3
      woodenclaps+rattle1.mp3
      woodenclaps+rattle2.mp3
      woodenclaps+rattle3.mp3
      yogaballs1.mp3
      yogaballs2.mp3
      yogaballs3.mp3
      zube_tube_plain1.mp3
      zube_tube_plain2.mp3
      zube_tube_plain3.mp3
      zube_tube_sus1.mp3
      zube_tube_sus2.mp3
      zube_tube_sus3.mp3
      zube_tube_sus4_long.mp3
      zube_tube_sus5_rhythm.mp3
      zube_tube4_raindrops.mp3
      `;


      function transformToEffectsLibrary(fileList) {
        console.log('Procesando fileList:', fileList); // Verifica el contenido del fileList
        const effects = fileList
            .split('\n')
            .map((file) => file.trim())
            .filter((file) => file !== '');
    
        console.log('Efectos procesados:', effects); // Verifica que los efectos se han procesado correctamente
    
        const effectsLibrary = {
            randomSounds: effects.map(
                (file) => `https://tonejs.github.io/audio/berklee/${file}`
            ),
        };
    
        console.log('Librería de efectos:', effectsLibrary); // Verifica el contenido de la librería de efectos
    
        return effectsLibrary;
    }
    
    // Suponiendo que fileList ya está definido en algún lugar
    const effectsLibrary = transformToEffectsLibrary(fileList);
    
    let sampler = null;
    let playing = false;
    
    async function createRandomSampler() {
        console.log('Creando sampler aleatorio...');
        const randomIndex = Math.floor(
            Math.random() * effectsLibrary.randomSounds.length
        );
        const soundUrl = effectsLibrary.randomSounds[randomIndex];
    
        console.log('URL del sonido seleccionado:', soundUrl);
    
        const panValue = Math.random() > 0.5 ? -1 : 1;
        console.log('Valor de paneo:', panValue);
    
        sampler = new Tone.Sampler({
            C4: soundUrl,
        }).toDestination();
    
        sampler.set({
            pan: panValue,
            volume: -Infinity,
        });
    
        await Tone.loaded();
        console.log('Sampler creado y cargado.');
        return sampler;
    }
    
    async function playNextSound() {
        if (!playing) {
            console.log('La reproducción está detenida.');
            return;
        }
    
        console.log('Reproduciendo siguiente sonido...');
    
        if (sampler) {
            console.log('Eliminando sampler anterior.');
            sampler.dispose();
        }
    
        sampler = await createRandomSampler();
        console.log('Sampler listo para reproducir.');
        sampler.triggerAttackRelease('C4', '5s');
    
        sampler.volume.setValueAtTime(-Infinity, Tone.now());
        sampler.volume.linearRampToValueAtTime(-15, Tone.now() + 1);
    
        const randomTime = Math.random() * 14 + 1;
        console.log('Reproduciendo siguiente sonido en', randomTime, 'segundos.');
    
        setTimeout(playNextSound, randomTime * 1000);
    
        setTimeout(() => {
            console.log('Reduciendo volumen.');
            sampler.volume.linearRampToValueAtTime(-Infinity, Tone.now() + 1);
        }, 3000);
    }
    
    function stopSound() {
        console.log('Deteniendo reproducción.');
        if (sampler) {
            sampler.dispose();
            sampler = null;
        }
        playing = false;
    }
    
    document
        .getElementById('playRandomSound')
        .addEventListener('click', () => {
            console.log('Botón de reproducir presionado.');
            Tone.start();
            playing = true;
            playNextSound();
        });
    
    document.getElementById('stopSound').addEventListener('click', () => {
        console.log('Botón de detener presionado.');
        stopSound();
    });
    