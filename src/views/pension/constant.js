const Default_Data = {
    // isMale: true,
    age: 25, // 当前年龄
    retirementAge: 60, // 预计退休年龄
    actualContributedYears: 2,// 以前实际缴费的年限, 默认按照当前阶段的缴纳工资基数和社会平均工资计算以前年度的工资指数,暂不支持自定义

    /** 职工工资 */
    baseWage: 4494, // 公司为你申报的缴纳工资基数
    wageGrowth: 0.03,// 预计工资增长率

    enterpriseRate: 0.16, // 企业缴费比例
    individualRate: 0.08, // 个人缴费比例
    monthlyContribution: 0, // 月缴费额（自动）


    averageSocialWage: 7490, // 上年度社会平均工资
    /* 以下为预测信息，实际情况请以统计局公布为准  */
    averageSocialWageGrowth: 0.05, // 社会平均工资增长率

    balance: 20000, // 当前账户余额
    personalRate: 0.02, // 个人账户利率
};


const MonthSheat = {
    40: 233,
    41: 230,
    42: 226,
    43: 223,
    44: 220,
    45: 216,
    46: 230,
    47: 230,
    48: 230,
    49: 230,
    50: 195,
    51: 230,
    52: 230,
    53: 230,
    54: 230,
    55: 170,
    56: 230,
    57: 230,
    58: 230,
    59: 230,
    60: 139,
    61: 230,
    62: 230,
    63: 230,
    64: 109,
    65: 101,
    66: 93,
    67: 84,
    68: 75,
    69: 65,
    70: 56,
}

export { Default_Data, MonthSheat }