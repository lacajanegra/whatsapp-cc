
//var UserList = require('api/models/user_list');

var Agent = require('./api/models/agent');
var Attended = require('./api/models/attended');


var whatsapi = require('whatsapi');
var wa = whatsapi.createAdapter({
  msisdn         : '56952832363',
  password       : 'VNGSCWfs7fzTSw3i+Xh2xKXy+6A=',
  username       : "test clo9",
  ccode          : '56',
}, false);


var Firebase = require("firebase");

var FSuOnLine = new Firebase('https://flickering-inferno-8829.firebaseio.com/online');
var FSmDirect = new Firebase('https://flickering-inferno-8829.firebaseio.com/direct');
var FSnWaitingStack = new Firebase('https://flickering-inferno-8829.firebaseio.com/waiting');

var agents = [];
var attended = [];
var waitingStack = [];
var autoAssist = [];



//pruebas
/*
var agent = new Agent({"id":"1", "name":"A 1", "available":"1"});
agents.push(agent);
agent = new Agent({"id":"2", "name":"A 2", "available":"0"});
agents.push(agent);
printAgents();

//var att = new Attended({"id":"1", "number":"56971243863"});
//attended.push(att);
waitingStack.push("2");
waitingStack.push("3");
waitingStack.push("4");
console.log(waitingStack.splice(0, 1));*/
//receiveMessages("56971243863","hola");
//receiveMessages("56971243863","chao");

//printAgents();
//printWaitingStack();



wa.connect(function connected(err) {
    if (err) { console.log(err); return; }
    console.log('Connected');
    // Now login
    wa.login(logged);
    wa.on('receivedMessage', function(from, id, name, body, author){
          var num = from.from.split("@");
          receiveMessages(num[0], from.body);
    });
});



function logged(err) {
    if (err) { console.log(err); return; }
    console.log('Logged in to WA server');
    wa.sendIsOnline();
    console.log('loged');
    



}








function receiveMessages(num, msg){
//***** LOGICA
// preguntar si esta atendido : ok
    // si atendido: envia msj a id de agente
    // no atendido:
          // módulo autoatención
          // buscar agentes disponibles
                // si agente disponible: asignar
                // no agente disponible: encolar  
  var elementPos = attended.map(function(x) {return x.number; }).indexOf(num); 
  if (elementPos == -1){ // no esta siendo atendido
        console.log("> este numero no esta siendo atendido ("+num + ")");

          autoAssistModel(num,msg);

        /* ASIGNANDO AGENTE O ENCOLANDO */
       /* var availableAgentIndex = searchAvailableAgent();
            if (availableAgentIndex == -1) { //No hay agente disponibles, se debe encolar
                console.log("> no hay agentes disponibles, se debe encolar");
                var numOnStackWaiting = waitingStack.indexOf(num);
                if (numOnStackWaiting == -1) {
                    console.log("argegar numero a cola");
                    waitingStack.push(num);
                    FSnWaitingStack.push({num: num});
                }else{
                    console.log("ya esta en cola");
                };
            }else{ // Hay agentes disponibles
                agents[availableAgentIndex].setAvailability("0"); // seteo no disponible al agente
                console.log(num +  " " +num);
                console.log("> mensaje tomado por agente " + agents[availableAgentIndex].getId() );
                var att = new Attended({"id":agents[availableAgentIndex].getId(), "number":num});
                attended.push(att);
                FSmDirect.push({name: num, text: msg, to: "agent", num: num , id:agents[availableAgentIndex].getId()});
                //enviar msj
                printAttended();  
                printAgents();  
            };*/
        /** FIN ASIGNANDO AGENTE O ENCOLANDO */


  }else{// es atendidoa
      console.log("> el numero " + num + " ya esta siendo atendido");
      console.log("> mensaje enviado a agente " + attended[elementPos].getId());
      FSmDirect.push({name: num, text: msg, to: "agent", num: num , id:attended[elementPos].getId()});
  };
}
function distributeClient(num,msg){
    var availableAgentIndex = searchAvailableAgent();
            if (availableAgentIndex == -1) { //No hay agente disponibles, se debe encolar
                console.log("> no hay agentes disponibles, se debe encolar");
                var numOnStackWaiting = waitingStack.indexOf(num);
                if (numOnStackWaiting == -1) {
                    console.log("argegar numero a cola");
                    waitingStack.push(num);
                    FSnWaitingStack.push({num: num});
                }else{
                    console.log("ya esta en cola");
                };
            }else{ // Hay agentes disponibles
                agents[availableAgentIndex].setAvailability("0"); // seteo no disponible al agente
                console.log(num +  " " +num);
                console.log("> mensaje tomado por agente " + agents[availableAgentIndex].getId() );
                var att = new Attended({"id":agents[availableAgentIndex].getId(), "number":num});
                attended.push(att);
                FSmDirect.push({name: num, text: msg, to: "agent", num: num , id:agents[availableAgentIndex].getId()});
                //enviar msj
                printAttended();  
                printAgents();  
            };

}

function searchAvailableAgent(){
    var elementPos = agents.map(function(x) {return x.available; }).indexOf("1"); 
    return elementPos;

}

function printAgents(){
  console.log("        -----------------");
  console.log("        stack of agents: ");
  agents.forEach(function(agent){
  console.log(agent);
  });
  console.log("        -----------------");
}
function printWaitingStack(){
  console.log("        -----------------");
  console.log("        stack of waiting: ");
  waitingStack.forEach(function(waiting){
  console.log(waiting);
  });
  console.log("        -----------------");
}
function printAttended(){
  console.log("        -----------------");
  console.log("        stack of attendeds: ");
  attended.forEach(function(att){
  console.log(att);
  });
  console.log("        -----------------");
}
var fbUsr1 = new Firebase("https://flickering-inferno-8829.firebaseio.com/users/1/connections");
var fbUsr2 = new Firebase("https://flickering-inferno-8829.firebaseio.com/users/2/connections");
var fbUsr3 = new Firebase("https://flickering-inferno-8829.firebaseio.com/users/3/connections");






FSmDirect.on('child_added', function(snapshot) { //Recibe mensaje
      var message = snapshot.val();
      if (message.to=="whatsapp") 
      {
              if (message.num=="-1") 
              {
                  console.log("> no hay destinatario para enviar mensaje. probablemente acabas de terminar una conversacion");
              }else{
                sendMsg(message.num, message.text);
              };
              
      };

});






//***** CONEXION Y DESCONEXION DE AGENTES*****
FSuOnLine.on('child_added', function(snapshot) { 
        var message = snapshot.val(); // message muestra ( id, name, op)
        var elementPos = agents.map(function(x) {return x.id; }).indexOf(message.id); 

        console.log(message.op);
        if (message.op == "online") { // Agente se esta conectando  
                  //***comprueba existencia de agente en el runtime
                  if (elementPos==-1){
                    console.log("> nuevo agente, id: " + message.id + " nombre: " + message.name);
                    
                    
                    

                     var firstOfWaitingStack = popWaitingStack();
                      if (firstOfWaitingStack == -1) {
                            console.log("> no hay numeros esperando en la cola");
                            console.log("> agente " + message.id + " esta disponible");
                            var agent = new Agent({"id":message.id, "name":message.name, "available":"1"});
                            agents.push(agent);
                      }else{
                        // agregar relacion (agente, whatsapp)
                        var agent = new Agent({"id":message.id, "name":message.name, "available":"0", });
                        agents.push(agent);
                        console.log("> hay personas esperando en cola");
                        var elementPos = agents.map(function(x) {return x.id; }).indexOf(message.id); 
                        setAttendWhatsapp(elementPos,firstOfWaitingStack[0]);
                      };



                  }else{
                    console.log("> ya existe agente, id: " + message.id + " nombre: " + message.name);
                  }      
        }else if(message.op == "offline"){
                  if (elementPos==-1){
                    console.log("> no existe agente " + message.id + " en linea, imposible desceonectarlo");
                  }else{
                    agents.splice(elementPos, 1);
                    console.log("> agente " + message.id + " desconectado");
                  }
        }else if(message.op == "available"){
                  printAttended();
                  var num = message.num;
                  console.log("elementPos es " + elementPos);
                  console.log(agents[elementPos].getId());
                  var attPosNum = attended.map(function(x) {return x.number; }).indexOf(num); 
                  if (elementPos == -1){ // agente no atiende a nadie 
                        console.log("> ocurrio un error. segun mis registros, el agente " + agents[elementPos].getId() + " no atendia a nadie")
                  }else{ // agente si estaba atendiendo
                      attended.splice(attPosNum, 1); //retiro la relacion (agente, whatsapp) de la cola de atendidos
                      console.log("> agente " + agents[elementPos].getId() + " ahora esta libre de conversaciones");
                      deleteMsgs(message); //se eliminan todos los mensajes
                      //************* voy a buscar encolados
                      var firstOfWaitingStack = popWaitingStack();
                      if (firstOfWaitingStack == -1) {
                            console.log("> no hay numeros esperando en la cola");
                            console.log("> agente " + agents[elementPos].getId() + " esta disponible");
                            agents[elementPos].setAvailability("1");
                      }else{
                        // agregar relacion (agente, whatsapp)
                        setAttendWhatsapp(elementPos,firstOfWaitingStack[0]);
                      };

                  }
                  
        }else{
                  console.log("> error al procesar estado de agente (en linea o desconectado)");
        };
        FSuOnLine.remove();
        //**********************************
        printAgents();   
});
//**********************************

function setAttendWhatsapp(posAgent,num){
           // agents[availableAgentIndex].setAvailability("0"); // seteo no disponible al agente
            console.log("> mensaje tomado por agente " + agents[posAgent].getId() );
            var att = new Attended({"id":agents[posAgent].getId(), "number":num});
            attended.push(att);
            printAttended();
}
function popWaitingStack(){
  var pop = waitingStack.splice(0, 1);
  console.log(pop[0]);
  if (pop == ""){
    return -1;
  }else
  {
    var flagFromMethod=1;
      
      FSnWaitingStack.orderByChild("num").equalTo(pop[0]).on("child_added", function(snapshot) {
                      if (flagFromMethod==1) {
                        console.log(FSnWaitingStack.toString()+"/"+snapshot.key());
                        var aux = new Firebase(FSnWaitingStack.toString()+"/"+snapshot.key());
                      aux.remove();
                      console.log("eliminando");
                      flagFromMethod=0;
                     return 0;
                      };                
      });
      return pop;
  }
}

function deleteMsgs(message,hola){
                var flagFromMethod=1;
                FSmDirect.orderByChild("num").equalTo(message.num).on("child_added", function(snapshot) {
                    if (flagFromMethod==1) {
                      var aux = new Firebase(FSmDirect.toString()+"/"+snapshot.key());
                    aux.remove();
                    console.log("eliminando");
                    flagFromMethod=0;
                   return 0;
                    };
                    
              });
}

//***************ENVIAR MENSAJE A WHATSAPP ****************************
function sendMsg(num,text){
               wa.sendMessage(num, text, function(err, id) {
              if (err) { console.log(err.message); return; }
              console.log('> mensaje recibido por el servidor %s', id);
              });
}
//*******************************************


//*************** GESTION PADRES E HIJOS MODULO AUTOATENCION****************************
function getSunNode(actualNode){
              var ret = [];
              if (actualNode == 'x') {
                      ret[0] = {"id":"1","option":"1","description":"1. Información DUOC UC"};
                      ret[1] = {"id":"2","option":"2","description":"2. Becas y Créditos"};
                      ret[2] = {"id":"3","option":"3","description":"3. Ejecutivo Digital"};
                      return ret;
              }else if(actualNode == 'x1'){
                      ret[0] = {"id":"4","option":"1","description":"1. Quiénes Somos?"};
                      ret[1] = {"id":"5","option":"2","description":"2. Cuánto tiempo de acreditación poseemos?"};
                      ret[2] = {"id":"6","option":"3","description":"3. Volver"};
                      return ret;
              }else if(actualNode == 'x2'){
                      ret[0] = {"id":"8","option":"1","description":"1. Quiénes pueden acceder al Crédito con Aval del estado?"};
                      ret[1] = {"id":"9","option":"2","description":"2. Cuáles son los requisitos para obtener el crédito?"};
                      ret[2] = {"id":"10","option":"3","description":"3. Volver"};
                      return ret;
              }else if(actualNode == 'x3'){
                      ret[0] = {"id":"11","option":"3","description":"assign-agent"};
                      return ret;
              }else if(actualNode == 'x11'){
                      ret[0] = {"id":"12","end":1,"option":"1","description":"a. Institución de Educación Superior, fundada por la Universidad Católica de Chile. Que busca contribuir a la misión social de la Universidad Católica, generando  labores de extensión educativa, mediante la capacitación, la educación media técnico-profesional y otros programas de suplencia.\r\n\r\n Gracias.\r\n\r\n\r\n\r\nSesión Finalizada"};
                      return ret;
              }else if(actualNode == 'x12'){
                      ret[0] = {"id":"13","end":1,"option":"2","description":"b. El Instituto Profesional Duoc UC cuenta con Acreditación por 7 años desde agosto 2010 hasta agosto 2017 en Docencia de Pregrado y Gestión Institucional. El Centro de Formación Técnico Duoc UC cuenta con Acreditación por 6 años desde noviembre 2011 hasta noviembre 2017 en Docencia de Pregrado y Gestión Institucional.\r\n\r\n Gracias.\r\n\r\n\r\n\r\nSesión Finalizada"};
                      return ret;
              }else if(actualNode == 'x21'){
                      ret[0] = {"id":"14","end":1,"option":"1","description":"a. Pueden postular tanto nuevos como antiguos de alguna carrera de pregrado.\r\n\r\n Gracias.\r\n\r\n\r\n\r\nSesión Finalizada"};
                      return ret;
              }else if(actualNode == 'x22'){
                      ret[0] = {"id":"15","end":1,"option":"2","description":"b. b. Ser chileno o extranjero con residencia definitiva en el país. Condiciones socio-económicas del grupo familiar que justifiquen el otorgamiento del beneficio. Matricularse en una carrera de pregrado en una institución de educación superior autónoma, acreditada y que participe del Sistema de Créditos con Garantía Estatal. No haber egresado de una carrera universitaria conducente al grado de licenciado, que haya sido financiada con el Fondo Solidario de Crédito Universitario y/o con este mismo crédito. Mérito académico. Las exigencias mínimas para los alumnos de primer año son: Promedio de notas de Enseñanza Media igual o superior a 5.27, o puntaje promedio de PSU, Lenguaje y Matemáticas, de 475 puntos. Se consideran válidas las PSU rendidas en el año de postulación o en los dos años anteriores (puntualmente para la postulación del Año. \r\n\r\n Gracias.\r\n\r\n\r\n\r\nSesión Finalizada"};
                      return ret;
              };



}

function autoAssistModel(num,option){
autoAssist.push({"num":"4567890", "node":"x"});
var autoAssistPos = autoAssist.map(function(x) {return x.num; }).indexOf(num); 
var wMsg = "";
if (autoAssistPos == -1) { // primera vez que entra a autoatención
        //enviar msj bienvenida
        autoAssist.push({"num":num, "node":"x"});  //agregar a lista de autoasistencia
        console.log(getSunNode('x')); //enviar opciones
        wMsg = "Bienvenido a la plataforma Digital DUOC UC, elige una opción válida: \r\n\r\n";
        getSunNode('x').forEach(function(data){
            wMsg = wMsg + data.description + "\r\n";
        });
        sendMsg(num, wMsg);
}else{ //ya estaba en autoatención
        console.log('ya esta en autoatencion');
      //  var option="1";
        var objAutoAttention = [];
        console.log(autoAssist[autoAssistPos].node);
        objAutoAttention = getSunNode(autoAssist[autoAssistPos].node); //traemos las opciones para el nodo actual
        console.log(objAutoAttention);
        var optionPos = objAutoAttention.map(function(x) {return x.option; }).indexOf(option); //buscamos si la opcion ingresada es correcta

          if (optionPos == -1){
                console.log("opcion incorrecta");
          }else{
                console.log("opcion correcta");
                var flagOptionAssignAgent=0;
                autoAssist[autoAssistPos].node = autoAssist[autoAssistPos].node + option;
                  getSunNode(autoAssist[autoAssistPos].node).forEach(function(data){
                        if (data.description == "assign-agent"){
                              flagOptionAssignAgent=1;
                        }
                        wMsg = wMsg + data.description + "\r\n";
                        if (data.end==1){
                          console.log("fin");
                          autoAssist.splice(autoAssistPos, 1);
                        }
                  });
                        if (flagOptionAssignAgent==1){
                              console.log("inicia asignacion de agente"); // inicia busqueda de agente disponible y todo eso
                              distributeClient(num,option);
                        }else{
                            sendMsg(num, wMsg);
                            console.log(autoAssist);
                        };

                    
          };

};


}

function getFatherNode(actualNode){

}
//*******************************************

