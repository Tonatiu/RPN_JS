function RPN(dependencies)
{
	this.dependencies = dependencies;
	this.resolve = function (){
		if(!('dependency' in this.dependencies))
			return;
		var stack = [];
		var Element;
		
		for(i = 0; i < this.dependencies.dependency.length; i++){
			Element = this.dependencies.dependency[i];
			if(Element.type == "Operand")
				stack.push(Element.value);
			
			if(Element.type == "Operator"){
				switch(Element.value){
					case 'IN':
						var op1 = stack.pop();
						var op2 = stack.pop();
						
						if(Array.isArray(op1))
							stack.push(op1.includes(op2));
						else if(Array.isArray(op2))
							stack.push(op2.includes(op1));
						break;
					case 'OR':
						var op1 = stack.pop();
						var op2 = stack.pop();
						stack.push(op2 || op1);
						break;
					case 'AND':
						var op1 = stack.pop();
						var op2 = stack.pop();
						stack.push(op2 && op1);
						break;
					case 'XOR':
						var op1 = stack.pop();
						var op2 = stack.pop();
						stack.push((op2 && !op1) || (!op2 && op1));
						break;
					case 'EQUALS':
						var op1 = stack.pop();
						var op2 = stack.pop();
						stack.push(op2 == op1);
						break;
					case 'DIFFERENT':
						var op1 = stack.pop();
						var op2 = stack.pop();
						stack.push(op2 != op1);
						break;
					case 'LTH':
						var op1 = stack.pop();
						var op2 = stack.pop();
						stack.push(parseFloat(op2) < parseFloat(op1));
						break;
					case 'GTH':
						var op1 = stack.pop();
						var op2 = stack.pop();
						stack.push(parseFloat(op2) > parseFloat(op1));
						break;
					case 'LTHE':
						var op1 = stack.pop();
						var op2 = stack.pop();
						stack.push(parseFloat(op2) <= parseFloat(op1));
						break;
					case 'GTHE':
						var op1 = stack.pop();
						var op2 = stack.pop();
						stack.push(parseFloat(op2) >= parseFloat(op1));
						break;
					case 'NOT':
						var op1 = stack.pop();
						stack.push(!op1);
						break;
					case 'CONTAINS':
						var op1 = stack.pop();
						var op2 = stack.pop();

						if(Array.isArray(op1) && Array.isArray(op2))
							stack.push(this.contains(op1, op2));
						else
							stack.push(false);
						break;
					case 'SUMA':
						var op1 = stack.pop();
						var op2 = stack.pop();
						
						stack.push(String(parseFloat(op2) + parseFloat(op1)));
						break;
					case 'RESTA':
						var op1 = stack.pop();
						var op2 = stack.pop();
						
						stack.push(String(parseFloat(op2) - parseFloat(op1)));
						break;
					case 'MULTIPLICA':
						var op1 = stack.pop();
						var op2 = stack.pop();
						
						stack.push(String(parseFloat(op2) * parseFloat(op1)));
						break;
					case 'DIVIDE':
						var op1 = stack.pop();
						var op2 = stack.pop();
						
						stack.push(String(parseFloat(op2) / parseFloat(op1)));
						break;
					case 'POW':
						var op1 = stack.pop();
						var op2 = stack.pop();
						
						stack.push(String(Math.pow(parseFloat(op2), parseFloat(op1))));
						break;
					case 'IF':
						var op1 = stack.pop();
						var op2 = stack.pop();
						var op3 = stack.pop();
						
						if(op3)
							stack.push(op2);
						else
							stack.push(op1);
						break;
				}
			}
		}
		return stack;
	};
	this.contains = function (array1, array2){
		var container, values;
		
		if(array1.length < array2.length){
			container = array2;
			values = array1;
		}else{
			container = array1;
			values = array2;
		}
		
		for(j = 0; j < values.length; j++){
			if(container.includes(values[j]))
				return true;
		}
		
		return false;
	};
}