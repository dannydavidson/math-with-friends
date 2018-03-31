import _ from 'lodash';
import ArithmeticSolver, { ArithmeticProblem, operators, operandSlots, operatorSymbols } from './solver';

describe('ArithmeticSolver', () => {

  describe('#newProblem', () => {

    it('returns ArithmeticProblem', () => {
      let solver = new ArithmeticSolver();
      expect(solver.newProblem()).toBeInstanceOf(ArithmeticProblem);
    });

  });

});

describe('ArithmeticProblem', () => {

  describe('#getEquation', () => {

    it('returns correct structure for randomized problem', () => {
      let problem = new ArithmeticProblem(0, 99);
      let equation = problem.getEquation();
      let varSlotsFound = 0;

      expect(operatorSymbols).toContain(equation.operator);

      operandSlots.forEach((slot) => {
        if (_.isNil(equation[slot])) {
          varSlotsFound = varSlotsFound + 1;
        }
      });

      expect(varSlotsFound).toEqual(1);

    });

    it('consistently generates random problems that satisfy the 0-99 operand range', () => {
      _.range(1000)
        .forEach(() => {
          let problem = new ArithmeticProblem(0, 99);
          let equation = problem.getEquation();
          let solvedVariable = problem.getSolvedVariable();

          operandSlots.forEach((slot) => {
            if (!_.isNil(equation[slot])) {
              expect(_.inRange(equation[slot], 0, 100)).toBeTruthy();
            }
          });

          expect(Number.isInteger(solvedVariable) && _.inRange(solvedVariable, 0, 100)).toBeTruthy();

        });
    });

    it('returns matching structure for passed problem', () => {
      let passedProblem = {
        left: 88,
        solution: 22,
        operator: operators.add
      };
      let problem = new ArithmeticProblem(0, 99, passedProblem);
      let equation = problem.getEquation();

      expect(equation.left).toEqual(88);
      expect(equation.solution).toEqual(22);
      expect(equation.operator).toEqual(operators.add.symbol);
    });

  });

  describe('#testVariableSolution', () => {

    const falseTable = [
      {
        problem: {
          left: 77,
          operator: operators.add,
          solution: 85
        },
        testedValue: 4
      },
      {
        problem: {
          right: 77,
          operator: operators.multiply,
          solution: 85
        },
        testedValue: 4
      },
      {
        problem: {
          left: 33,
          right: 11,
          operator: operators.divide,
        },
        testedValue: 2
      },
    ];

    const trueTable = [
      {
        problem: {
          left: 77,
          operator: operators.add,
          solution: 85
        },
        testedValue: 8
      },
      {
        problem: {
          right: 9,
          operator: operators.subtract,
          solution: 65
        },
        testedValue: 74
      },
      {
        problem: {
          left: 6,
          operator: operators.multiply,
          solution: 36
        },
        testedValue: 6
      },
    ];

    it('returns false on incorrect values', () => {
      falseTable.forEach((config) => {
        let problem = new ArithmeticProblem(0, 99, config.problem);

        expect(problem.testVariableSolution(config.testedValue)).toBeFalsy();
      });
    });

    it('returns true on correct values', () => {
      trueTable.forEach((config) => {
        let problem = new ArithmeticProblem(0, 99, config.problem);

        expect(problem.testVariableSolution(config.testedValue)).toBeTruthy();
      });
    });

  });

  describe('#getSolvedVariable', () => {

    const table = [
      {
        problem: {
          left: 6,
          operator: operators.multiply,
          solution: 36
        },
        solvedVariable: 6
      },
      {
        problem: {
          right: 88,
          operator: operators.add,
          solution: 98
        },
        solvedVariable: 10
      },
      {
        problem: {
          right: 10,
          operator: operators.subtract,
          solution: 78
        },
        solvedVariable: 88
      },
      {
        problem: {
          left: 80,
          operator: operators.divide,
          solution: 2
        },
        solvedVariable: 40
      },
    ];

    it('returns correct solved value for problem', () => {
      table.forEach((config) => {
        let problem = new ArithmeticProblem(0, 99, config.problem);

        expect(problem.getSolvedVariable()).toEqual(config.solvedVariable);
      });
    });

  });

});
