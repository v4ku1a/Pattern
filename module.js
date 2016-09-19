// Module Pattern
'use strict';

console.log('Starting');
console.log('\n');

// Entity to inject in the module
let objectToInject = 'injected';

// Module begin
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
// Module end

// Testing the module

// Accessing public properties
coolModule.var1++;

console.log(coolModule.method());
console.log('public var: ' + coolModule.var1);
console.log('\n');


// Accessing private properties
// console.log(coolModule._privateMethod1()); // Error
console.log('private var: ' + coolModule._privateVar1); // undefined


