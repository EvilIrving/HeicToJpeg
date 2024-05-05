<template>
    <div class="flex m-4">
        <section class="flex-1  px-4">
            <h2 class="text-xl mb-4 font-bold text-center">
                养老金计算器
                <!-- <icon class="" name="info-circle" size="medium" /> -->
            </h2>
            <el-form ref="formRef" :model="formData" :rules="rules" label-width="auto" class="px-8" :size="formSize"
                status-icon>
                <el-form-item label="年龄" prop="age">
                    <el-input v-model="formData.age" />
                </el-form-item>
                <el-form-item label="性别" prop="retirementAge">
                    <el-radio-group v-model="formData.retirementAge">
                        <el-radio :value="60">男</el-radio>
                        <el-radio :value="55">女</el-radio>
                    </el-radio-group>
                    <span class="px-4">
                        退休年龄: {{ formData.retirementAge }}
                    </span>

                </el-form-item>
                <el-form-item label="以前实际缴费的年限" name="actualContributedYears">
                    <el-input v-model="formData.actualContributedYears" clearable placeholder="">
                        <template #suffix> 年 </template>
                    </el-input>
                </el-form-item>
                <!-- 职工工资 -->
                <el-form-item label="公司为你申报的缴纳基数" prop="baseWage">
                    <el-input v-model="formData.baseWage" clearable placeholder=""> <template #suffix> 元
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="工资增长率" prop="wageGrowth">
                    <el-input v-model="formData.wageGrowth" clearable placeholder="" :formatter="formatInput"
                        :parser="parserInput">
                        <template #suffix> %
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="企业缴费比例" prop="enterpriseRate">
                    <el-input v-model="formData.enterpriseRate" clearable placeholder="" @change="entRateChange"
                        :formatter="formatInput" :parser="parserInput">
                        <template #suffix> %
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="个人缴费比例" prop="individualRate">
                    <el-input v-model="formData.individualRate" clearable placeholder="" @change="indRateChange"
                        :formatter="formatInput" :parser="parserInput">
                        <template #suffix> %
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="月缴费额(自动)" prop="monthlyContribution">
                    <el-input disabled v-model="formData.monthlyContribution" clearable placeholder=""> <template
                            #suffix> 元
                        </template>
                    </el-input> </el-form-item>
                <el-form-item label="参保地上一年社会月平均工资" prop="averageSocialWage">
                    <el-input v-model="formData.averageSocialWage" clearable placeholder=""> <template #suffix> 元
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="社会月平均工资增长率" prop="averageSocialWageGrowth">
                    <el-input v-model="formData.averageSocialWageGrowth" clearable placeholder=""
                        :formatter="formatInput" :parser="parserInput">
                        <template #suffix> %
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="个人账户余额" prop="balance">
                    <el-input v-model="formData.balance" clearable placeholder=""> <template #suffix> 元
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item label="个人账户记账利率" prop="personalRate">
                    <el-input v-model="formData.personalRate" clearable placeholder="" :formatter="formatInput"
                        :parser="parserInput">
                        <template #suffix> %
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="default" @click="resetForm(formRef)">重置</el-button>
                    <el-button type="primary" @click="submitForm(formRef)">计算</el-button>
                </el-form-item>
            </el-form>

        </section>
        <section class="flex-1">
            <section class="text-sm text-left">
                <h3 class="text-lg font-bold">计算方式：</h3>
                <h3 class="text-base font-bold my-3">你能领到的养老金就是个人账户和统筹账户加起来的数额</h3>
                <h4 class="text-sm font-bold">退休后每个月个人账户领到的钱：</h4>
                <p class="my-3">（缴纳基数 * 8% * 缴纳年数 + 这些钱在这些年的利息）/ 计发月份</p>

                <h4 class="text-sm font-bold">退休后每个月统筹账户领到的钱：</h4>
                <p class="my-3">申领养老金时上年度全市职工月平均工资 * （1 + 月平均缴费工资指数）/ 2 * 缴纳年数 * 1%</p>
                <p class="text-xs">其中月平均缴费工资指数是: 几十年来, (每个月缴纳工资基数 / 上年度社会月平均工资) 的累加 / 累计月数 </p>
                <!-- <h4>注意：上述数据均为预期账面数值，并未考虑通货膨胀因素。</h4> -->
            </section>
            <el-divider class="my-8">养老金预算结果</el-divider>
            <section v-show="Object.keys(pensions).length !== 0" class="text-left text-green-500">
                <h3 class="text-lg font-bold">养老金预算结果：</h3>
                <h4 class="text-sm font-bold">退休年份：{{ pensions.retire_year }}年</h4>
                <!-- <h4>退休时个人养老金账户余额为：{{ pensions.pension }}</h4> -->
                <h4 class="text-sm font-bold">退休后每月大致能拿：{{ pensions.pension }}元(其中基础养老金{{ pensions.basePension
                    }}元,个人养老金{{
                pensions.personalPension }}元)
                </h4>
                <h4 class="text-sm font-bold"> 退休后社会平均工资为：{{ pensions.averageWageLastYearWhenRetire }}元</h4>
                <h4 class="text-sm font-bold">退休后养老金约等于上一年社会平均工资的{{ pensions.factor }}%</h4>
            </section>
        </section>
    </div>

</template>

<script setup>
import Pension from './model'
import { validate } from '@/utils/index'
import { ref, reactive, toRefs } from 'vue'
import { Default_Data } from './constant';

const formSize = 'large'
let formRef = ref(undefined)
let formData = reactive({ ...Default_Data })
const rules = reactive({
    age: [{ required: true, message: '年龄必填' }],
    retirementAge: [{ required: true, message: '退休年龄必填' }],
    // actualContributedYears: [{ required: true, message: '以前实际缴费的年限必填', type: 'error' }],
    baseWage: [{ required: true, message: '缴纳基数必填' }],
    // wageGrowth: [{ required: true, message: '工资增长率必填' }],
    // enterpriseRate: [{ required: true, message: '企业缴纳比例必填' }],
    // individualRate: [{ required: true, message: '个人缴纳比例必填' }],
    averageSocialWage: [{ required: true, message: '上年度社会月平均工资必填' }],
    // averageSocialWageGrowth: [{ required: true, message: '社会月平均工资增长率必填' }],
    // balance: [{ required: true, message: '个人账户余额必填' }],
    // personalRate: [{ required: true, message: '个人账户利率必填' }],
})

const submitForm = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            calculate()
        } else {
            console.log('error submit!!')
        }
    })
}
let pensions = reactive({})

const resetForm = (formEl) => {
    if (!formEl) return
    formEl.resetFields()
    pensions = reactive({})
}
// 计算
function calculate() {
    // 验证数据合法性
    let {
        age,
        retirementAge,
        actualContributedYears,
        balance
    } = toRefs(formData)
    // 创建验证器函数，将验证函数作为参数传递给它
    const validator = validate(validatePensionYears, validatePensionBalance, validateAge);
    const validationResult = validator(actualContributedYears.value, balance.value, age.value, retirementAge.value);
    if (!validationResult.success) {
        ElMessage({
            message: validationResult.msg,
            type: 'warning',
        })
        return;
    }



    // 计算养老金
    const model = new Pension(toRefs(formData))
    pensions = reactive(model.calculate())
}

// 验证缴纳年限
function validatePensionYears(actualContributedYears, balance) {
    // 如果以前没有缴纳年限, 则个人账户当前余额需为空
    const result = { success: true, msg: '' }
    if (actualContributedYears && balance) return result
    result.success = false
    result.msg = '以前没有缴纳年限, 则个人账户需为空'
    return result
}
// 验证余额
function validatePensionBalance(actualContributedYears, balance) {
    const result = { success: true, msg: '' }
    // 个人账户当前余额需大于或等于0
    if (balance && balance < 0) return { success: false, msg: '个人账户当前余额需大于或等于0' }

    if (balance && actualContributedYears) return result
    // 如果个人账户余额为空, 则不存在已有缴纳年限
    result.success = false
    result.msg = '如果个人账户余额为空, 则不存在已有缴纳年限'
    return result
}
// 验证年龄合法
function validateAge(actualContributedYears, retirementAge, age) {
    const result = { success: true, msg: '' }
    if (age < 18) return { success: false, msg: '你不要去上班!' }

    if ((actualContributedYears + retirementAge - age) < 15) {
        result.success = false
        result.msg = '总缴费年限不满15年，不能按月领取养老金！'
    }
    return result
}

function entRateChange(ev) {
    const data = toRefs(formData)
    const { baseWage, individualRate } = data
    data.monthlyContribution.value = calc_month_contribution(baseWage.value, ev / 100, individualRate.value / 100).toFixed(0)

}
function indRateChange(ev) {
    const data = toRefs(formData)
    const { baseWage, enterpriseRate } = data
    data.monthlyContribution.value = calc_month_contribution(baseWage.value, enterpriseRate.value / 100, ev / 100).toFixed(0)

}
function parserInput(value) {
    return Number(value) / 100
}
function formatInput(value) {
    // console.log(value);
    return (value * 100).toFixed(0)
}
function calc_month_contribution(wage, enterprise, individual) {
    return wage * (enterprise + individual)
}

</script>