import _ from 'lodash';

export const operatorSymbols = ['+', '-', '\u00D7', '\u00F7'];
export const operandSlots = ['left', 'right', 'solution'];

export const operators = {

  add: {

    symbol: operatorSymbols[0],

    left: function (right, solution) {
      return solution - right;
    },

    right: function (left, solution) {
      return solution - left;
    },

    solution: function (left, right) {
      return left + right;
    },

    test: function (left, right, solution) {
      return left + right === solution;
    }

  },

  subtract: {

    symbol: operatorSymbols[1],

    left: function (right, solution) {
      return solution + right;
    },

    right: function (left, solution) {
      return (solution - left) * -1;
    },

    solution: function (left, right) {
      return left - right;
    },

    test: function (left, right, solution) {
      return left - right === solution;
    }
  },

  multiply: {

    symbol: operatorSymbols[2],

    left: function (right, solution) {
      return solution / right;
    },

    right: function (left, solution) {
      return solution / left;
    },

    solution: function (left, right) {
      return left * right;
    },

    test: function (left, right, solution) {
      return left * right === solution;
    }
  },

  divide: {

    symbol: operatorSymbols[3],

    left: function (right, solution) {
      return solution * right;
    },

    right: function (left, solution) {
      return left / solution;
    },

    solution: function (left, right) {
      return left / right;
    },

    test: function (left, right, solution) {
      return left / right === solution;
    }
  }

}

export class ArithmeticProblem {

  constructor(minValue = 0, maxValue = 99, problem) {

    // unpack passed problem for use
    if (problem) {

      operandSlots.forEach((key) => {
        if (_.isNil(problem[key])) {
          this.variableSlot = key;
          return;
        }

        if (_.inRange(problem[key], minValue, maxValue + 1)) {
          this[key] = problem[key];
        } else {
          throw new Error('Integer passed in problem is out of range');
        }
      });

      this.operator = problem.operator;
      return;
    }

    // ensure problem is randomly balanced on operators even though addition/substraction
    // has more valid combinations than multiplication/division
    this.operator = operators[_.sample(Object.keys(operators))];

    // otherwise generate randomly
    while (true) {
      this._clear();
      this.variableSlot = _.sample(operandSlots);

      operandSlots.forEach((slotKey) => {
        if (slotKey !== this.variableSlot) {
          this[slotKey] = _.random(minValue, maxValue);
        }
      });

      let solvedVariable = this.getSolvedVariable();

      if (Number.isInteger(solvedVariable) && _.inRange(solvedVariable, minValue, maxValue + 1)) {
        return
      }
    }

  }

  getEquation() {
    return {
      left: this.left !== undefined ? this.left : null,
      right: this.right !== undefined ? this.right : null,
      operator: this.operator.symbol,
      solution: this.solution !== undefined ? this.solution : null
    }
  }

  testVariableSolution(value) {
    switch (this.variableSlot) {
      case 'left':
        return this.operator.test(value, this.right, this.solution);
      case 'right':
        return this.operator.test(this.left, value, this.solution);
      case 'solution':
        return this.operator.test(this.left, this.right, value);
    }
  }

  getSolvedVariable() {
    switch (this.variableSlot) {
      case 'left':
        return this.operator.left(this.right, this.solution);
      case 'right':
        return this.operator.right(this.left, this.solution);
      case 'solution':
        return this.operator.solution(this.left, this.right);
    }
  }

  _clear() {
    delete this.left;
    delete this.right;
    delete this.solution;
  }

}

export default class ArithmeticSolver {

  constructor(minValue, maxValue) {
    this.minValue = minValue;
    this.maxValue = maxValue;
  }

  newProblem(problem) {
    return new ArithmeticProblem(this.minValue, this.maxValue, problem);
  }

}
