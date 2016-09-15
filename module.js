'use strict';

console.log('Starting');
console.log('\n');

let objectToInject = 'injected';

// Module
let coolModule = (function(injection){

  let _privateVar1 = 1;
  let _privateVar2 = 2;

  let publicVar1 = 7;
  let publicVar2 = 17;

  let _privateMethod1 = function() {
    console.log('I`m private');
    console.log('Var: ' + _privateVar1);
    console.log('\n');
  };

  let _privateMethod2 = function() {
    console.log('I`m private');
    console.log('Module injection: ' + injection);
    console.log('\n');
  };

  let publicMethod = function(){
    _privateMethod1();
    _privateMethod2();
    return 'Public method end';
  };

  // PUBLIC exports  
  return {
    var1: publicVar1,
    var2: publicVar2,
    method: publicMethod
  }
  
})(objectToInject);



coolModule.var1++;

console.log(coolModule.method());
console.log('public var: ' + coolModule.var1);
console.log('\n');

// console.log(coolModule._privateMethod1()); // Error
console.log('private var: ' + coolModule._privateVar1); // undefined


