function RPN(dependencies)
{
	this.toExecute_1 = NaN;
	this.toExecute_2 = NaN;
	this.dependencies = dependencies;
	this.resolve = function (){
		if(!('dependency' in this.dependencies))
			return;
		var $stack = [];
		var $element;
		
		for(i = 0; i < this.dependencies.dependency.length; i++){
			$element = this.dependencies.dependency[i];
			if($element.type == "Operand")
				$stack.push($element)
			if($element.type == "Operator"){
				switch($element.value){
					case 'IN':
						var $op1 = $stack.pop();
						var $op2 = $stack.pop();
						
						if(Array.isArray($op1))
							$stack.push($op1.includes($op2));
						else if(Array.isArray($op2))
							$stack.push($op2.includes($op1));
						break;
					case 'OR':
						var $op1 = $stack.pop();
						var $op2 = $stack.pop();
						$stack.push($op1 || $op2);
						break;
					case 'AND':
						var $op1 = $stack.pop();
						var $op2 = $stack.pop();
						$stack.push($op1 && $op2);
						break;
					case 'XOR':
						var $op1 = $stack.pop();
						var $op2 = $stack.pop();
						$stack.push(($op1 && !$op2) || (!$op1 && $op2));
						break;
					case 'EQUALS':
						var $op1 = $stack.pop();
						var $op2 = $stack.pop();
						$stack.push($op1 == $op2);
						break;
					case 'DIFFERENT':
						var $op1 = $stack.pop();
						var $op2 = $stack.pop();
						$stack.push($op1 != $op2);
						break;
					case 'LTH':
						var $op1 = $stack.pop();
						var $op2 = $stack.pop();
						$stack.push($op1 < $op2);
						break;
					case 'GTH':
						var $op1 = $stack.pop();
						var $op2 = $stack.pop();
						$stack.push($op1 > $op2);
						break;
					case 'LTHE':
						var $op1 = $stack.pop();
						var $op2 = $stack.pop();
						$stack.push($op1 <= $op2);
						break;
					case 'GTHE':
						var $op1 = $stack.pop();
						var $op2 = $stack.pop();
						$stack.push($op1 >= $op2);
						break;
					case 'NOT':
						var $op1 = $stack.pop();
						$stack.push(!$op1);
						break;
					case 'CONTAINS':
						var $op1 = $stack.pop();
						var $op2 = $stack.pop();
						
						if(Array.isArray($op1) && Array.isArray($op2))
							$stack.push(contains($op1, $op2));
						break;
					case 'SUMA':
						var $op1 = $stack.pop();
						var $op2 = $stack.pop();
						
						$stack.push($op1 + $op2);
						break;
					case 'RESTA':
						var $op1 = $stack.pop();
						var $op2 = $stack.pop();
						
						$stack.push($op1 - $op2);
						break;
					case 'MULTIPLICA':
						var $op1 = $stack.pop();
						var $op2 = $stack.pop();
						
						$stack.push($op1 * $op2);
						break;
					case 'DIVIDE':
						var $op1 = $stack.pop();
						var $op2 = $stack.pop();
						
						$stack.push($op1 / $op2);
						break;
					case 'POW'
						var $op1 = $stack.pop();
						var $op2 = $stack.pop();
						
						$stack.push(Math.pow($op1, $op2));
						break;
					case 'IF':
						var $op1 = $stack.pop();
						var $op2 = $stack.pop();
						var $op3 = $stack.pop();
						
						if($op3){
							stack.push($op2);
							this.toExecute_1();
						}
						else{
							stack.push($op1);
							this.toExecute_2();
						}
						break;
				}
			}
		}
		return $stack;
	};
	this.contains = function ($array1, $array2){
		var container, values;
		
		if($array1.length < $array2.length){
			container = $array2;
			values = $array1;
		}else{
			container = $array1;
			values = $array2;
		}
		
		for(i = 0; i < values.length; i++){
			if(container.includes(values[i]))
				return true;
		}
		
		return false;
	};
}