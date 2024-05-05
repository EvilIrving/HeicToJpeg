class Calculator {
    constructor() {
        this.value = 0;
        this.history = [];
    }

    executeCommand(command) {
        this.value = command.execute(this.value);
        this.history.push(command);
    }

    undo() {
        const command = this.history.pop();
        this.value = command.undo(this.value);
    }

    getValue() {
        return this.value;
    }
}

// Command Interface
class Command {
    execute() { }
    undo() { }
}

class AddCommand extends Command {
    constructor(valueToAdd) {
        this.valueToAdd = valueToAdd;
    }

    execute(currentValue) {
        return currentValue + this.valueToAdd;
    }

    undo(currentValue) {
        return currentValue - this.valueToAdd;
    }
}

class SubtractCommand extends Command {
    constructor(valueToSubtract) {
        this.valueToSubtract = valueToSubtract;
    }

    execute(currentValue) {
        return currentValue - this.valueToSubtract;
    }

    undo(currentValue) {
        return currentValue + this.valueToSubtract;
    }
}

class MultiplyCommand extends Command {
    constructor(valueToMultiply) {
        this.valueToMultiply = valueToMultiply;
    }

    execute(currentValue) {
        return currentValue * this.valueToMultiply;
    }

    undo(currentValue) {
        return currentValue / this.valueToMultiply;
    }
}

class DivideCommand extends Command {
    constructor(valueToDivide) {
        this.valueToDivide = valueToDivide;
    }

    execute(currentValue) {
        return currentValue / this.valueToDivide;
    }

    undo(currentValue) {
        return currentValue * this.valueToDivide;
    }
}

export {
    Calculator, AddCommand, SubtractCommand, MultiplyCommand, DivideCommand
}

// // 使用示例
// const calculator = new Calculator();
// calculator.executeCommand(new AddCommand(5));
// console.log(calculator.value);    //输出：5
// calculator.executeCommand(new MultiplyCommand(2));
// console.log(calculator.value);    //输出：10
// calculator.undo();
// console.log(calculator.value);    //输出：5