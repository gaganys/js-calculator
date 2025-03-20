const numbers = document.querySelectorAll('.number')
const buttonEquals = document.getElementById('equals')
const buttonClear = document.getElementById('clear')
const operations = document.querySelectorAll('.operation-btn')
const leftSide = document.querySelector('.left-side')
const rightSide = document.querySelector('.right-side')
const answersBlock = document.querySelector('.answers')

let currentOperation = null
let firstOperand = ''
let secondOperand = ''
let history = [] // Массив для хранения истории операций

// Функция обновления дисплея калькулятора
const updateDisplay = () => {
	leftSide.textContent = currentOperation
		? firstOperand + ' ' + currentOperation
		: firstOperand
	rightSide.textContent = secondOperand

	// Отображаем историю операций
	answersBlock.innerHTML = history
		.map(
			operation =>
				`<div>${operation.firstOperand} ${operation.operator} ${operation.secondOperand} = ${operation.result}</div>`
		)
		.join('')
}

// Функция для вычисления результата
const calculateResult = (first, operator, second) => {
	const num1 = parseFloat(first)
	const num2 = parseFloat(second)

	switch (operator) {
		case '+':
			return num1 + num2
		case '-':
			return num1 - num2
		case 'x':
			return num1 * num2
		case '/':
			if (num2 === 0) {
				return 'Error: Division by zero'
			}
			return num1 / num2
		default:
			return 'Error: Invalid operation'
	}
}

// Обработчик событий для ввода с клавиатуры
document.addEventListener('keydown', event => {
	const key = event.key

	// Проверяем, является ли нажатая клавиша цифрой или точкой
	if (/[0-9]/.test(key)) {
		if (currentOperation === null) {
			firstOperand += key
		} else {
			secondOperand += key
		}
		updateDisplay()
	}

	// Обработка точки
	if (key === '.') {
		if (currentOperation === null) {
			if (!firstOperand.includes('.')) {
				firstOperand += key
			}
		} else if (!secondOperand.includes('.')) {
			secondOperand += key
		}
		updateDisplay()
	}

	// Проверяем, является ли нажатая клавиша операцией (+, -, *, /)
	if (/[\+\-\*\/]/.test(key)) {
		if (firstOperand) {
			currentOperation = key
			updateDisplay()
		}
	}

	// Обработка клавиши Backspace для удаления последнего символа
	if (key === 'Backspace') {
		if (currentOperation === null) {
			firstOperand = firstOperand.slice(0, -1)
		} else {
			secondOperand = secondOperand.slice(0, -1)
		}
		updateDisplay()
	}

	// Обработка клавиши Enter для выполнения операции
	if (key === 'Enter') {
		if (firstOperand && secondOperand && currentOperation) {
			const result = calculateResult(
				firstOperand,
				currentOperation,
				secondOperand
			)

			// Сохраняем операцию в историю
			history.push({
				firstOperand: firstOperand,
				operator: currentOperation,
				secondOperand: secondOperand,
				result: result,
			})

			// Отображаем результат в правой части
			rightSide.textContent = result

			// Очищаем текущие значения для следующей операции
			firstOperand = ''
			secondOperand = ''
			currentOperation = null

			updateDisplay()
		}
	}

	// Обработка клавиши Escape для полной очистки
	if (key === 'Escape') {
		firstOperand = ''
		secondOperand = ''
		currentOperation = null
		updateDisplay()
	}
})

// Обработчики для кнопок калькулятора
numbers.forEach(number => {
	number.addEventListener('click', () => {
		const value = number.textContent

		switch (value) {
			case '<':
				if (currentOperation === null) {
					firstOperand = firstOperand.slice(0, -1)
				} else {
					secondOperand = secondOperand.slice(0, -1)
				}
				break
			case '.':
				if (currentOperation === null) {
					if (!firstOperand.includes('.')) {
						firstOperand += '.'
					}
				} else if (!secondOperand.includes('.')) {
					secondOperand += '.'
				}
				break

			default:
				if (currentOperation === null) {
					firstOperand += value
				} else {
					secondOperand += value
				}
				break
		}
		updateDisplay()
	})
})

operations.forEach(operation => {
	operation.addEventListener('click', () => {
		if (firstOperand) {
			currentOperation = operation.textContent
		}

		updateDisplay()
	})
})

buttonClear.addEventListener('click', () => {
	firstOperand = ''
	secondOperand = ''
	currentOperation = null
	updateDisplay()
})

buttonEquals.addEventListener('click', () => {
	if (firstOperand && secondOperand && currentOperation) {
		const result = calculateResult(
			firstOperand,
			currentOperation,
			secondOperand
		)

		// Сохраняем операцию в историю
		history.push({
			firstOperand: firstOperand,
			operator: currentOperation,
			secondOperand: secondOperand,
			result: result,
		})

		// Отображаем результат в правой части
		rightSide.textContent = result

		// Очищаем текущие значения для следующей операции
		firstOperand = ''
		secondOperand = ''
		currentOperation = null

		updateDisplay()
	}
})
