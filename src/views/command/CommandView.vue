<script setup>
import { ref } from 'vue';
import { AddCommand, Calculator, SubtractCommand, DivideCommand, MultiplyCommand } from './Comand'

const calculator = new Calculator()
const value = ref(0)

function add() {
  calculator.executeCommand(new AddCommand(2))
  value.value = calculator.getValue()
}

function subtract() {
  calculator.executeCommand(new SubtractCommand(1))
  value.value = calculator.getValue()
}

function multiply() {
  calculator.executeCommand(new MultiplyCommand(1.5))
  value.value = calculator.getValue()
}


function divide() {
  calculator.executeCommand(new DivideCommand(2))
  value.value = calculator.getValue()
}

function undo() {
  calculator.undo()
  value.value = calculator.getValue()
}
</script>

<template>
  <main>
    <div class="left">
      <h3>result: {{ value }} </h3>
    </div>
    <div class="right">
      <button @click="add">+</button>
      <button @click="subtract">-</button>
      <button @click="multiply">*</button>
      <button @click="divide">/</button>
      <button @click="undo">undo</button>
    </div>
  </main>
</template>

<style scoped>
div {
  border: 1px solid black;
  width: 50%;
  height: 100px;
  margin: 10px auto;
  display: flex;
  justify-content: space-around;
  align-items: center;

  button {
    width: 50px;
    height: 20px;
    font-size: 16px;
    background-color: #eee;
    border: none;
    border-radius: 5px;
    line-height: 1;
    cursor: pointer;
  }
}
</style>
