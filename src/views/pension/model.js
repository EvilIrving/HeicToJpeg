import { MonthSheat } from './constant'
class Pension {
    constructor({ age,
        retirementAge,
        actualContributedYears,
        baseWage,
        wageGrowth,

        enterpriseRate,
        individualRate,

        monthlyContribution,
        averageSocialWage,
        averageSocialWageGrowth,

        balance,
        personalRate, }) {
        this.age = age.value// 当前年龄
        this.retirementAge = retirementAge.value// 预计退休年龄
        this.actualContributedYears = actualContributedYears.value // 以前实际缴费的年限, 默认按照当前阶段的缴纳工资基数和社会平均工资计算以前年度的工资指数,暂不支持自定义

        /** 职工工资 */
        this.baseWage = baseWage.value // 公司为你申报的缴纳工资基数
        this.wageGrowth = wageGrowth.value// 预计工资增长率

        this.enterpriseRate = enterpriseRate.value // 企业缴费比例
        this.individualRate = individualRate.value// 个人缴费比例
        this.monthlyContribution = monthlyContribution.value // 月缴费额（自动）


        this.averageSocialWage = averageSocialWage.value // 上年度社会平均工资
        /* 以下为预测信息，实际情况请以统计局公布为准  */
        this.averageSocialWageGrowth = averageSocialWageGrowth.value// 社会平均工资增长率

        this.balance = balance.value// 当前账户余额
        this.personalRate = personalRate.value // 个人账户利率
    }

    // 计算结果
    calculate() {
        const retire_years = this.get_year_cont() // 缴费年限
        const personalBalance = this.get_retirement_balance(retire_years); // 退休时个人账户余额
        const personalPension = this.get_retirement_monthly_contribution(personalBalance) // 退休时个人部分每月计发退休金
        const averageWageLastYearWhenRetire = this.get_average_social_wage_retirement(retire_years);

        const personalWageIndexAverage = this.get_monthly_wage_avarage_index(retire_years)
        const basePension = this.get_monthly_pension_base(averageWageLastYearWhenRetire, personalWageIndexAverage, retire_years);
        const factor = (basePension + personalPension) / averageWageLastYearWhenRetire * 100

        return {
            retire_year: this.get_retirement_year(), // 哪年退休
            personalBalance: personalBalance.toFixed(0), // 退休时个人账户余额
            personalPension: personalPension.toFixed(0), // 退休时个人部分每月计发退休金
            pension: this.get_total_pension(personalPension, basePension).toFixed(0), // 总退休金
            basePension: basePension.toFixed(0), // 基础养老金
            averageWageLastYearWhenRetire: averageWageLastYearWhenRetire.toFixed(0), // 退休时上年度全市职工月平均工资
            factor: factor.toFixed(0)
        }
    }
    // 计算缴费年限
    get_year_cont () {
        return this.retirementAge - this.age - 1
    }
    // 计算哪年退休
    get_retirement_year() {
        const now = new Date();
        const year = now.getFullYear();
        const retire_year = year * 1 + (this.retirementAge - this.age) * 1;
        return retire_year
    }

    /** 个人养老金部分 */
    // 退休时个人账户余额
    get_retirement_balance(years) {
        // 初始化变量
        let finalBalance = this.balance;
        let annualContribution = this.baseWage; // 初始年度缴纳额

        // 循环计算每年的余额
        for (let year = 1; year <= years; year++) {
            // 计算每年的工资增长后的缴纳额
            annualContribution *= (1 + this.wageGrowth);

            // 将年度缴纳额加到余额上
            finalBalance += annualContribution;

            // 考虑利息或其他收益，可以在这里添加代码
            finalBalance += finalBalance * this.personalRate;
        }

        // 返回最终余额
        return finalBalance;
    }

    // 退休时个人部分每月计发退休金
    get_retirement_monthly_contribution(personalBalance) {
        // 获取退休年龄对应的计发月数
        const monthlyPayoutPeriod = MonthSheat[this.retirementAge];

        // 检查计发月数是否存在
        if (monthlyPayoutPeriod === undefined) {
            throw new Error(`退休年龄 ${this.retirementAge} 对应的计发月数不存在。`);
        }

        // 计算每月计发金额
        const monthlyPension = personalBalance / monthlyPayoutPeriod;

        // 返回每月计发金额，保留两位小数
        return parseFloat(monthlyPension);
    }


    // 计算月缴费额
    get_monthly_contribution() {
        return wage * (enterprise + individual)
    }

    // 计算预计退休年龄到当前年龄的年数 = 缴费年限
    get_year_count() {
        return this.retirementAge - this.age - 1
    }



    /** 基础养老金部分 */
    // 办理申领基本养老金手续时上年度全市职工月平均工资

    get_average_social_wage_retirement(years) {
        let result = this.averageSocialWage * Math.pow(1 + this.averageSocialWageGrowth, years)
        return parseFloat(result.toFixed(4))
    }

    // 月平均缴费工资指数

    get_monthly_wage_avarage_index(years) {
        // (Z1 + Z2 + ... + Zm) / N
        const N = years * 12 + this.actualContributedYears * 12
        let yearAverageSocialWage = this.averageSocialWage * 12, yearBaseWage = this.baseWage * 12

        let personalWageIndex = this.actualContributedYears === 0 ? 0 : (yearBaseWage / yearAverageSocialWage) * this.actualContributedYears * 12


        for (let i = 0; i < years; i++) {
            // 缴费工资指数 = 缴费工资 / 社平工资
            yearBaseWage *= (1 + this.wageGrowth), yearAverageSocialWage *= (1 + this.averageSocialWageGrowth)
            const annualWageIndex = yearBaseWage / yearAverageSocialWage
            personalWageIndex += parseFloat((annualWageIndex * 12).toFixed(4));
        }
        return personalWageIndex / N;
    }

    // 基础养老金每月计发金额

    get_monthly_pension_base(averageWageLastYearWhenRetire, personalWageIndexAverage, years) {
        const indexedAverageWage = averageWageLastYearWhenRetire * personalWageIndexAverage;

        const base = (averageWageLastYearWhenRetire + indexedAverageWage) / 2 * years * 0.01
        return base
    }

    // 计算个人养老金总额

    get_total_pension(person, base) {
        /*
            退休养老金 =  个人养老金 + 基础养老金
            个人养老金 = 个人账户储存额 / 计发月数 = (个人缴费工资基数 * 8% * 12 个月) * 缴费年限
            基础养老金 = 办理申领基本养老金手续时上年度全市职工月平均工资＋本人指数化月平均缴费工资)÷２×缴费年限(含视同缴费年限)×１％

            本人指数化月平均缴费工资 ＝ 办理申领基本养老金手续时上年度全市职工月平均工资×本人月平均缴费工资指数

            本人月平均缴费工资指数 ＝ 月缴费工资指数 / 累计缴费年限的月数 

            月缴费工资指数数  =  实际月缴费工资基数 / 上年度全市职工月平均工资 (保留 4 位小数)
         */

        return person + base
    }


}

export default Pension