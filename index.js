'use strict';

console.log('Starting');


class SomeClass {

  constructor() {
    this.mediator = null;
  }

  call(someData, to) {
    this.mediator.send(someData, this, to);
  }

  callback(someData, from) {
    console.log('From: ' + from + ' Data: ' + someData);
  }
}


// Short way. Maybe not optimal (not with prototype) but we have private property.
// let Mediator = function(){

//   let _participants = [];

//   return {

//     register: function(participant) {
//       if(_participants.indexOf(participant) === -1) {
//         _participants.push(participant);
//       }
//       else {
//         console.log('already registered: ' + participant);
//       }
//       participant.mediator = this;    
//     },

//     send: function(someData, from, to) {
//       if (to) {
//         to.callback(someData, from);    
//       } else {
//         for (let key in _participants) {   
//           if (_participants[key] !== from) {
//               _participants[key].callback(someData, from);
//           }
//         }
//       }
//     }
//   }
// };


// Fancy way to create private property
// let Mediator = (function(){

//   let _participants = [];

//   return class Mediator {

//     constructor() {
//       console.log();
//     }

//     register(participant) {
//       if(_participants.indexOf(participant) === -1) {
//         _participants.push(participant);
//       }
//       else {
//         console.log('already registered: ' + participant);
//       }
//       participant.mediator = this;    
//     }

//     send(someData, from, to) {
//       if (to) {
//         to.callback(someData, from);    
//       } else {
//         for (let key in _participants) {   
//           if (_participants[key] !== from) {
//               _participants[key].callback(someData, from);
//           }
//         }
//       }
//     }
//   }

// })();


// No private property
class Mediator {

  constructor() {
    this._participants = [];
  }

  register(participant) {
    if(this._participants.indexOf(participant) === -1) {
      this._participants.push(participant);
    }
    else {
      console.log('already registered: ' + participant);
    }
    participant.mediator = this;    
  }

  send(someData, from, to) {
    if (to) {
      to.callback(someData, from);    
    } else {
      for (let key in this._participants) {   
        if (this._participants[key] !== from) {
            this._participants[key].callback(someData, from);
        }
      }
    }
  }
}



function run() {
  var instanceAB = new SomeClass();
  var instanceCD = new SomeClass();
  var instanceEF = new SomeClass();
  var instanceGH = new SomeClass();

  var myMediator = new Mediator();
  myMediator.register(instanceAB);
  myMediator.register(instanceCD);
  myMediator.register(instanceEF);
  myMediator.register(instanceGH);

  instanceAB.call("Some data");
  instanceAB.call( { data: 'string' } );
  instanceCD.call("Private data", instanceAB);
  instanceEF.call("Some data");
  instanceGH.call("call instanceEF", instanceEF);    
}

run();
