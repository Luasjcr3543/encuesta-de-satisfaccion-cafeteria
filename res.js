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

//Obtencion del dia
const hoy = new Date();
const hoyFormat =  hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + (hoy.getDate());
//*********************************GRAFICAS */
let dataDb = [
      0,
     0,
      0,
      0,
      0

]
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Atencion', 'Café', 'Comida', 'Limpieza','Tiempo'],
        datasets: [{
            label: '% de satisfacción de clientes turno Vespertino',
            data: dataDb,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
    });
 const ctx2= document.getElementById('myChart2').getContext('2d');
    const myChart2 = new Chart(ctx2, {
    type: 'bar',
    data: {
        labels: ['Atencion', 'Café', 'Comida', 'Limpieza','Tiempo'],
        datasets: [{
            label: '% de satisfacción de clientes turno Matutino',
            data: dataDb,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function addData(chart,label, data) {
    console.log(data);
    chart.data.datasets.forEach((dataset) => {
        dataset.label = label;
        dataset.data=data;

    });
    chart.update();
}
function crearMtutino() {
   
    set(ref(db, 'calificaciones/2022-1-30/matutino'), {
        atencionR: 12,
        cafeR: 12,
        comidaR: 10,
        limpiezaR: 13,
        personas: 8,
        tiempoR: 3,
    });
     set(ref(db, 'calificaciones/2022-1-30/vespertino'), {
        atencionR: 12,
        cafeR: 12,
        comidaR: 10,
        limpiezaR: 13,
        personas: 8,
        tiempoR: 3,
    });
}

function traerResultadosFecha() {
    // crearMtutino();
    
    let fechaInicio = document.getElementById('fechaInicio').value;
    let fechaFin = document.getElementById('fechaFin').value;
    let a={}
    let calMatRef = ref(db, 'calificaciones/');
   
    if (fechaInicio === fechaFin) {
        get(ref(db, 'calificaciones/' + fechaInicio ))
        .then((snapshot) => {
            
            console.log(snapshot.val());
           
           
        });
    }else{
    

    get(calMatRef)
        .then((snapshot) => {
            
            let atencionR = 0,
                cafeR = 0,
                comidaR = 0,
                limpiezaR = 0,
                personas = 0,
                tiempoR = 0,
                atencionRm = 0,
                cafeRm = 0,
                comidaRm = 0,
                limpiezaRm = 0,
                personasm = 0,
                tiempoRm = 0;
           
            

            let resumenRef = ref(db, 'resumen');
            snapshot.forEach(element => {
                
                if (Date.parse(element.key) >= Date.parse(fechaInicio)  && Date.parse(element.key) <= Date.parse(fechaFin)  ) {
                    if (element.val().vespertino != null) {
                        atencionR += element.val().vespertino.atencionR;
                        cafeR += element.val().vespertino.cafeR;
                        comidaR += element.val().vespertino.comidaR;
                        limpiezaR += element.val().vespertino.limpiezaR;
                        personas += element.val().vespertino.personas;
                        tiempoR += element.val().vespertino.tiempoR;
                    }
                    if (element.val().matutino != null) {
                        atencionRm += element.val().matutino.atencionR;
                        cafeRm+=element.val().matutino.cafeR;
                        comidaRm+=element.val().matutino.comidaR;
                        limpiezaRm += element.val().matutino.limpiezaR;
                        personasm+=element.val().matutino.personas;
                        tiempoRm += element.val().matutino.tiempoR;
                    }
                   

                }         
            });
            if (personas === 0) {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'No se encontraron registros en este periodo de tiempo  🤔',
                    showConfirmButton: false,
                    timer: 2500
                })
            }
            let respuesta = {
                matutino: {
                atencionR: atencionRm,
                cafeR:cafeRm ,
                comidaR: comidaRm ,
                limpiezaR:limpiezaRm  ,
                personas:personasm ,
                tiempoR: tiempoRm, 
                    
                },
                vespertino: {
                atencionR: atencionR,
                cafeR:cafeR ,
                comidaR: comidaR ,
                limpiezaR:limpiezaR  ,
                personas:personas ,
                tiempoR: tiempoR,  
                }
               
            }
            set(resumenRef, respuesta);
           
            traerResultadosVespertino();
            traerResultadosMatutino()
        });
    
   }



 



}

function eventListeners() {
    document.getElementById('btn').addEventListener('click', () => {
        traerResultadosFecha();
       
    });


}

eventListeners();


function traerResultadosMatutino() {
  
  let calRefmat = ref(db, 'resumen/matutino');
   get(calRefmat).then((snapshot) => {

    const dataDbM = [
      snapshot.val().atencionR,
      snapshot.val().cafeR,
      snapshot.val().comidaR,
      snapshot.val().limpiezaR,
      snapshot.val().tiempoR,

       ]
       let lab = '% de satisfaccion.' + snapshot.val().personas + ' personas calificaron';
   addData(myChart2,lab, dataDbM);
   
    
  });


}
function traerResultadosVespertino() {
  
  let calRefmat = ref(db, 'resumen/vespertino');
  get(calRefmat).then((snapshot) => {

 dataDb = [
      snapshot.val().atencionR,
      snapshot.val().cafeR,
      snapshot.val().comidaR,
      snapshot.val().limpiezaR,
      snapshot.val().tiempoR,

      ]
      let lab = '% de satisfaccion.' + snapshot.val().personas + ' personas calificaron';
      addData(myChart,lab, dataDb);
    
    
  });

}

