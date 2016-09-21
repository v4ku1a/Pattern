'use strict';

console.log('Starting');


// Some generic class that will communicate with other classes through mediator class
class SomeClass {

  constructor() {
    // class has a link to mediator
    this.mediator = null;
  }

  // it sends calls to mediator
  call(someData, to) {
    this.mediator.send(someData, this, to);
  }

  // and recives calls from it
  callback(someData, from) {
    console.log('From: ' + from + ' Data: ' + someData);
  }
}


// Mediator class.
// it recives call from one class and redirects it to other class (or it can send a call only to specific class)
// mediator remembers all classes in _participants array
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


// Creating all instances and running calls
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

