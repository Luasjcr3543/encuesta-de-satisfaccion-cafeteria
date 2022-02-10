//+++++++++++++F I R E B A S E++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.4/firebase-app.js";
import { getDatabase, ref, set, onValue, push, query,orderByKey,get,child,equalTo,orderByChild} from "https://www.gstatic.com/firebasejs/9.6.4/firebase-database.js";

  // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDASR_z_tclmJGs87u9_r7KGrgge3jtBXE",
    authDomain: "encuesta-micracafe.firebaseapp.com",
    databaseURL: "https://encuesta-micracafe-default-rtdb.firebaseio.com",
    projectId: "encuesta-micracafe",
    storageBucket: "encuesta-micracafe.appspot.com",
    messagingSenderId: "671196418585",
    appId: "1:671196418585:web:35523f4cc5b2dd7a611088"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//REALTIME DATABASE
const db = getDatabase();
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//Variables de la app
let numPregunta = 1;
let numCal = 0;
let turno = '';
let respuestaCliente = {}


const hoy = new Date();

const hoyFormat = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + (hoy.getDate());
console.log(hoyFormat);





function agregarPregunta(num, pregunta) {
    
    set(ref(db, 'preguntas/'), pregunta);
     
}
const pregunta = {
    limpieza: "¿La limpieza del lugar te parecio adecuada?",
    atencion: "¿Como fue la atención que recibiste de parte de nosotros?",
    tiempo: "¿Que te parecio el tiempo de espera para atenderte?",
    comida: "Que imprsion tuviste de tus alimentos?",
    cafe: "EL café te parecio..."
 }
// agregarPregunta(1, pregunta);

eventListeners();


function eventListeners() {
    
    document.querySelector('.preguntas').addEventListener('click', (e) => {
        
        if (e.target.id === 'res1') {
            numCal = 1;
            document.getElementById('res1').classList.add('seleccion');
            document.getElementById('res2').classList.remove('seleccion');
            document.getElementById('res3').classList.remove('seleccion');
            document.getElementById('res4').classList.remove('seleccion');
            document.getElementById('res5').classList.remove('seleccion');

        }
        if (e.target.id === 'res2') {
            numCal = 2;
            document.getElementById('res1').classList.remove('seleccion');
            document.getElementById('res2').classList.add('seleccion');
            document.getElementById('res3').classList.remove('seleccion');
            document.getElementById('res4').classList.remove('seleccion');
            document.getElementById('res5').classList.remove('seleccion');
        }
        if (e.target.id === 'res3') {
            numCal = 3;
            document.getElementById('res1').classList.remove('seleccion');
            document.getElementById('res2').classList.remove('seleccion');
            document.getElementById('res3').classList.add('seleccion');
            document.getElementById('res4').classList.remove('seleccion');
            document.getElementById('res5').classList.remove('seleccion');
        }
        if (e.target.id === 'res4') {
            numCal = 4;
            document.getElementById('res1').classList.remove('seleccion');
            document.getElementById('res2').classList.remove('seleccion');
            document.getElementById('res3').classList.remove('seleccion');
            document.getElementById('res4').classList.add('seleccion');
            document.getElementById('res5').classList.remove('seleccion');
        }
        if (e.target.id === 'res5') {
            numCal = 5;
            document.getElementById('res1').classList.remove('seleccion');
            document.getElementById('res2').classList.remove('seleccion');
            document.getElementById('res3').classList.remove('seleccion');
            document.getElementById('res4').classList.remove('seleccion');
            document.getElementById('res5').classList.add('seleccion');
        }
        if (e.target.classList[1] === 'btn-success') {
            if (numCal != 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: '¡Tu respuesta fue enviada!',
                    showConfirmButton: false,
                    timer: 1500
                })

               

                document.getElementById('res1').classList.remove('seleccion');
                document.getElementById('res2').classList.remove('seleccion');
                document.getElementById('res3').classList.remove('seleccion');
                document.getElementById('res4').classList.remove('seleccion');
                document.getElementById('res5').classList.remove('seleccion');
                if (numPregunta === 1) {
                    respuestaCliente.atencion = numCal;
                    console.log(respuestaCliente);
                    
                }
                if (numPregunta === 2) {
                     respuestaCliente.cafe = numCal;
                    console.log(respuestaCliente);
                    
                }
                if (numPregunta === 3) {
                     respuestaCliente.comida = numCal;
                    console.log(respuestaCliente);
                }
                if (numPregunta === 4) {
                     respuestaCliente.limpieza = numCal;
                    console.log(respuestaCliente);
                }
                if (numPregunta === 5) {
                     respuestaCliente.tiempo = numCal;
                    console.log(respuestaCliente);
                }
                numPregunta++;
                
                buscarPregunta(numPregunta);
                if (numPregunta == 6) {
                    numPregunta = 1;
                    Swal.fire({
                        title: '<strong>¡Muchas gracias!</strong>',
                        icon: 'success',
                        html:
                            '<p>Has screenshot de esta pantalla</p>' +
                            '<img src="./img/79615450-café-vacío-interior-diseño-plano-ilustración-vectorial.jpg" alt="Cafeteria">' +
                            ' <h3>Usa el siguiente codigo y obten una cortesia gratis: <strong>12030kjh34</strong></h3>',
                        showCloseButton: false,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText:
                        '<i class="fa fa-thumbs-up"></i> Aceptar',
                    })
                    if (hoy.getHours() >= 15) {
                        
                        turno = 'v';
                        let calDiaRef = ref(db, 'calificaciones/' + hoyFormat + '/vespertino');
                        get(calDiaRef).then((spnapshot) => {

                            if (spnapshot.val() === null) {
                                const res = {                        
                                atencionR: respuestaCliente.atencion,
                                cafeR:respuestaCliente.cafe ,
                                comidaR: respuestaCliente.comida ,
                                limpiezaR: respuestaCliente.limpieza ,
                                personas: 1,
                                tiempoR: respuestaCliente.tiempo ,   
                            }
                                enviarBd(res, turno); 
                            }else{

                             const res = {                        
                                atencionR: respuestaCliente.atencion + spnapshot.val().atencionR,
                                cafeR:respuestaCliente.cafe + spnapshot.val().cafeR,
                                comidaR: respuestaCliente.comida + spnapshot.val().comidaR,
                                limpiezaR: respuestaCliente.limpieza + spnapshot.val().limpiezaR,
                                personas: 1 + spnapshot.val().personas,
                                tiempoR: respuestaCliente.tiempo + spnapshot.val().tiempoR,   
                            }
                                enviarBd(res, turno); 
                                }
                           
                           
                        });
   
                    } else {
                         turno = 'm';
                        let calDiaRef = ref(db, 'calificaciones/' + hoyFormat + '/matutino');
                        get(calDiaRef).then((spnapshot) => {
                            
                            if (spnapshot.val() === null) {
                                const res = {                        
                                atencionR: respuestaCliente.atencion,
                                cafeR:respuestaCliente.cafe ,
                                comidaR: respuestaCliente.comida ,
                                limpiezaR: respuestaCliente.limpieza ,
                                personas: 1,
                                tiempoR: respuestaCliente.tiempo ,   
                            }
                                enviarBd(res, turno); 
                            }else{

                             const res = {                        
                                atencionR: respuestaCliente.atencion + spnapshot.val().atencionR,
                                cafeR:respuestaCliente.cafe + spnapshot.val().cafeR,
                                comidaR: respuestaCliente.comida + spnapshot.val().comidaR,
                                limpiezaR: respuestaCliente.limpieza + spnapshot.val().limpiezaR,
                                personas: 1 + spnapshot.val().personas,
                                tiempoR: respuestaCliente.tiempo + spnapshot.val().tiempoR,   
                            }
                                enviarBd(res, turno); 
                                }
                           
                        });
                    }
                    
                   
                    document.getElementById('preguntas').classList.add('ocultar');
                    document.getElementById('inicio').classList.remove('ocultar');
                    
                }
            }
            else {
                console.log('Debes elegir una respuesta');
                Swal.fire(
                    'Por favor selecciona una opcion','',
                    'error'
                )
            }
        }        
    });
    document.getElementById('btn-iniciar').addEventListener('click', () => {
        document.getElementById('preguntas').classList.remove('ocultar');
        document.getElementById('inicio').classList.add('ocultar');
        numPregunta = 1;
        buscarPregunta(numPregunta);

     });
}

function buscarPregunta(numPregunta) {
    

    let pregRef = ref(db, 'preguntas');
    get(pregRef).then((spnapshot) => {

        let listPreguntas = [];
        spnapshot.forEach(pregunta => {
            listPreguntas.push(pregunta.val());
        });
        document.querySelector('.pregunta').innerHTML =listPreguntas[numPregunta-1];
        numCal = 0;

    });

    
    

    
}
function enviarBd(cal, turno) {
    console.log(turno)
    if(turno === 'm'){
        const caliRef = ref(db, 'calificaciones/' + hoyFormat + '/matutino');
        set(caliRef, cal);
    }
    if(turno === 'v'){
        const caliRef = ref(db, 'calificaciones/' + hoyFormat + '/vespertino');
        set(caliRef, cal);
    }

    
    
}