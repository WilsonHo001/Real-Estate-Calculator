class Property
{
    constructor(address, lat, lng, familySize, yearBuilt, fairMarketValue, maintenanceCost, netIncome, cashflow, tax, bedrooms, bathrooms)
    {
        // Property Info
        this.address = address;
        this.fairMarketValue = fairMarketValue;
        this.vacancyRate = 0.05;
        this.managementRate = 0.05;
        this.adertisingCostPerVacancy = 100;
        this.numberOfUnits = bedrooms;
        this.annualAppreciationRate = 0.0122;

        // Purchase Info
        this.offerPrice = fairMarketValue*0.92093023;
        this.repairs = fairMarketValue*0.00930233;
        this.repairsContingency = fairMarketValue*0.00465116;
        this.lenderFee = fairMarketValue*0.00562791;
        this.brokerFee = fairMarketValue*0;
        this.environmentals = fairMarketValue*0;
        this.inspectionsOrEngineersReport = fairMarketValue*0.00325581;
        this.appraisals = fairMarketValue*0.00313953;
        this.misc = fairMarketValue*0.00728837;
        this.transferTax = fairMarketValue*0.00570865;
        this.legal = 0.0044186;
        this.realPurchasePrice = this.offerPrice+this.repairs+this.repairsContingency+this.lenderFee+this.brokerFee+this.environmentals+this.inspectionsOrEngineersReport+this.appraisals+this.misc+this.transferTax+this.legal;

        //Financing (Monthly)
        this.downPaymentPercent = 0.25;
        this.firstMortgagePrincipleBorrowed = this.offerPrice-(this.offerPrice*this.downPaymentPercent);
        this.firstMortgageInterestRate = 0.0313;
        this.firstMortgageAmortizationPeriod = 30;
        this.firstMortgageCMHCFee = 0;
        this.firstMortgageTotalPrinciple = this.firstMortgagePrincipleBorrowed*(1+this.firstMortgageCMHCFee);

        this.firstMortgageTotalMonthlyPayment = this.firstMortgageTotalPrinciple*((((1+(this.firstMortgageInterestRate/2))^(1/6))-1)/(1-(((1+(this.firstMortgageInterestRate/2))^(1/6))^(this.firstMortgageAmortizationPeriod*(-12)))));

        this.secondMortgagePrincipleBorrowed = 0;
        this.secondMortgageInterestRate = 0.12;
        this.secondMortgageAmortizationPeriod = 9999;
        this.secondMortgageCMHCFee = 0;
        this.secondMortgageTotalPrinciple = this.secondMortgagePrincipleBorrowed*(1+this.secondMortgageCMHCFee);

        this.secondMortgageTotalMonthlyPayment = this.secondMortgageTotalPrinciple*((((1+(this.secondMortgageInterestRate/2))^(1/6))-1)/(1-(((1+(this.secondMortgageInterestRate/2))^(1/6))^(this.secondMortgageAmortizationPeriod*(-12)))));

        this.interestOnlyPrincipleAmount = 0;
        this.interestOnlyInterestRate = 0;
        this.interestOnlyTotalMonthlyPayment = this.interestOnlyPrincipleAmount*this.interestOnlyInterestRate/12;
        this.otherMonthlyFinancingCosts = 0;
        this.cashRequiredToCloseAfterFinancing = this.realPurchasePrice-this.firstMortgagePrincipleBorrowed-this.secondMortgagePrincipleBorrowed-this.interestOnlyPrincipleAmount;

        //Income (Annual)
        this.grossRents = (fairMarketValue*0.00232558)*bedrooms*12;
        this.parking = 0;
        this.storage = 0;
        this.laundry = 0;
        this.vending = 0;
        this.otherIncome = 0;
        this.totalIncome = this.grossRents+this.parking+this.storage+this.laundry+this.vending+this.otherIncome;
        this.vacancyLoss = this.totalIncome*this.vacancyRate;
        this.effectiveGrossIncome = this.totalIncome-this.vacancyLoss;

        // Operating Expenses (Annual)
        this.propertyTaxes = fairMarketValue*0.00046512*12;
        this.insurance = fairMarketValue*0.00060465*12;
        this.annualRepairs = this.grossRents*0.1;
        this.electricity = 0;
        this.gas = 0;
        this.lawnAndSnowMaintenance = 90*6;
        this.waterAndSewer = 0;
        this.cable = 0;
        this.management = this.totalIncome*this.managementRate;
        this.caretaking = 0;
        this.advertising = bedrooms*12*this.vacancyRate/2*this.adertisingCostPerVacancy;
        this.associationFees = 0;

        if (bedrooms < 2) {
            this.pestControl = 140*bedrooms;
        } else {
            this.pestControl = 70*bedrooms;
        }

        this.security = bedrooms*12*this.vacancyRate/1.5*50;
        this.trashRemoval = 0;
        this.miscellaneous = 0;
        this.commonAreaMaintenance = 0;
        this.capitalImprovements = 0;
        this.accounting = 0;
        this.annualLegal = 0;
        this.badDebts = 0;
        this.annualOther = 0;
        this.evictions = bedrooms*12*this.vacancyRate/2/10*1000;
        this.totalExpenses = Math.floor(this.propertyTaxes+this.insurance+
            this.annualRepairs+this.electricity+this.gas+
            this.lawnAndSnowMaintenance+this.waterAndSewer+
            this.cable+this.management+this.caretaking+
            this.advertising+this.associationFees+
            this.pestControl+this.security+this.trashRemoval+
            this.miscellaneous+this.commonAreaMaintenance+
            this.capitalImprovements+this.accounting+
            this.annualLegal+this.badDebts+
            this.annualOther+this.evictions);

        // Net Operating Income (Annual)
        this.netOperatingIncome = Math.floor(this.effectiveGrossIncome-this.totalExpenses);

        // Cash Requirements
        this.depositsMadeWithOffer = 0;
        this.lessProRationOfRents = 0;
        this.cashRequiredToClose = this.cashRequiredToCloseAfterFinancing - this.depositsMadeWithOffer;
        this.totalCashRequired = this.cashRequiredToClose+this.depositsMadeWithOffer-this.lessProRationOfRents;

        // CashflowSummary (Annual)
        // Effective Gross Income, Operating Expenses, Net Operating Income all have been calculated already.
        this.debtServicingCosts = (((-1)*this.firstMortgageTotalMonthlyPayment)-this.secondMortgageTotalMonthlyPayment-this.interestOnlyTotalMonthlyPayment-this.otherMonthlyFinancingCosts)*12;
        this.annualProfitOrLoss = this.netOperatingIncome+this.debtServicingCosts;
        this.totalMonthlyProfitOrLoss = Math.floor(this.annualProfitOrLoss/12);
        this.cashflowPerUnitPerMonth = this.totalMonthlyProfitOrLoss/bedrooms;

        // Quick Analysis
        this.firstMortgageLTV = this.firstMortgagePrincipleBorrowed/fairMarketValue;
        this.firstMortgageLTPP = this.firstMortgagePrincipleBorrowed/this.offerPrice;
        this.secondMortgageLTV = this.secondMortgagePrincipleBorrowed/fairMarketValue;
        this.secondMortgageLTPP = this.secondMortgagePrincipleBorrowed/this.offerPrice;
        this.capRateOnPP = this.netOperatingIncome/this.offerPrice;
        this.capRateOnFMV = this.netOperatingIncome/fairMarketValue;
        this.averageRent = 500;
        this.grm = this.offerPrice/this.grossRents;

        if (this.debtServicingCosts > 0) {
            this.dcr = 0;
        } else {
            this.dcr = this.netOperatingIncome/this.totalExpenses;
        }

        if (this.totalCashRequired <= 0) {
            this.cashOnCashROI = "Infinite"
        } else {
            this.cashOnCashROI = this.annualProfitOrLoss/this.totalCashRequired;
        }

        if (this.totalCashRequired <= 0) {
            this.equityROIAfterOneYear = "Infinite"
        } else {
            this.equityROIAfterOneYear = (this.firstMortgagePrincipleBorrowed-(this.firstMortgagePrincipleBorrowed-(this.firstMortgageTotalMonthlyPayment*12)+((this.firstMortgagePrincipleBorrowed*((1+(this.firstMortgageInterestRate/12))^12))-this.firstMortgagePrincipleBorrowed))-(this.firstMortgageTotalMonthlyPayment-(((1+(this.firstMortgageInterestRate/2))^2)^(1/12)-1)*(this.firstMortgagePrincipleBorrowed-(this.firstMortgageTotalMonthlyPayment*12)+((this.firstMortgagePrincipleBorrowed*((1+(this.firstMortgageInterestRate/12))^12))-this.firstMortgagePrincipleBorrowed))))/this.totalCashRequired;
        }

        if (this.totalCashRequired <= 0) {
            this.appreciationROIAfterOneYear = "Infinite"
        } else {
            if (this.totalCashRequired == 0) {
                this.appreciationROIAfterOneYear = 0;
            } else if (this.totalCashRequired > 0) {
                this.appreciationROIAfterOneYear = (fairMarketValue*(1+this.annualAppreciationRate)-fairMarketValue)/this.totalCashRequired;
            } else {
                this.appreciationROIAfterOneYear = (fairMarketValue*(1+this.annualAppreciationRate)-fairMarketValue)/((-1)*this.totalCashRequired);
            }
        }

        if (this.totalCashRequired <= 0) {
            this.totalROIAfterOneYear = "Infinite"
        } else {
            this.totalROIAfterOneYear = this.cashOnCashROI+this.equityROIAfterOneYear+this.appreciationROIAfterOneYear;
        }

        if (this.totalCashRequired <= 0) {
            this.forcedAppROIAfterOneYear = "Infinite"
        } else {
            if (this.totalCashRequired == 0) {
                this.forcedAppROIAfterOneYear = 0;
            } else if (this.totalCashRequired > 0) {
                this.forcedAppROIAfterOneYear = (fairMarketValue-this.realPurchasePrice)/this.totalCashRequired;
            } else {
                this.forcedAppROIAfterOneYear = (fairMarketValue-this.realPurchasePrice)/((-1)*this.totalCashRequired);
            }
        }
        
        this.expenseToIncomeRatio = (this.totalExpenses/this.totalIncome).toFixed(3);

        // Other Constructor Parameters
        this.lat = lat;
        this.lng = lng;

        this.familySize = "Unknown type";

        if (familySize == "land") {
            this.familySize = "Land";
        } else if (familySize == "single_family") {
            this.familySize = "Single-Family";
        } else if (familySize == "multi_family") {
            this.familySize = "Multi-Family";
        } else if (familySize == "condo") {
            this.familySize = "Condo";
        }

        this.yearBuilt = yearBuilt;
        //this.price = price; //this.fairMarketalue = fairMarketValue
        this.maintenanceCost = Math.floor(this.cashflow * 0.4);
        this.netIncome = Math.floor(this.cashflow * 0.6);
        this.cashflow = Math.floor(bedrooms*800+bathrooms*100+fairMarketValue*0.001);
        this.tax = tax;
        this.bedrooms = bedrooms;
        this.bathrooms = bathrooms;
        if (bedrooms == null) {
            this.bedrooms = 0;
        }
        
    }

    get_address()
    {
        return this.address;
    }

    get_lat()
    {
        return this.lat;
    }

    get_lng() 
    {
        return this.lng;
    }

    get_familySize()
    {
        return this.familySize;
    }

    get_yearBuilt()
    {
        return this.yearBuilt;
    }

    get_fairMarketValue()
    {
        return this.fairMarketValue;
    }

    get_maintenanceCost()
    {
        return this.maintenanceCost;
    }

    get_netIncome()
    {
        return this.netIncome;
    }

    get_cashflow()
    {
        return this.cashflow;
    }

    get_tax()
    {
        return this.tax;
    }

    get_bedrooms()
    {
        return this.bedrooms;
    }

    get_bathrooms()
    {
        return this.bathrooms;
    }

    get_realPurchasePrice()
    {
        return this.realPurchasePrice;
    }

    get_firstMortgageTotalPrinciple()
    {
        return this.firstMortgageTotalPrinciple;
    }

    get_firstMortgageTotalMonthlyPayment()
    {
        return this.firstMortgageTotalMonthlyPayment;
    }

    get_cashRequiredToCloseAfterFinancing()
    {
        return this.cashRequiredToCloseAfterFinancing;
    }

    get_grossRents()
    {
        return this.grossRents;
    }

    get_totalIncome()
    {
        return this.totalIncome;
    }

    get_vacancyLoss()
    {
        return this.vacancyLoss;
    }

    get_effectiveGrossIncome()
    {
        return this.effectiveGrossIncome;
    }

    get_management()
    {
        return this.management;
    }

    get_advertising()
    {
        return this.advertising;
    }

    get_pestControl()
    {
        return this.pestControl;
    }

    get_security()
    {
        return this.security;
    }

    get_evictions()
    {
        return this.evictions;
    }

    get_totalExpenses()
    {
        return this.totalExpenses;
    }

    get_netOperatingIncome()
    {
        return this.netOperatingIncome;
    }

    get_cashRequiredToClose()
    {
        return this.cashRequiredToClose;
    }

    get_totalCashRequired()
    {
        return this.totalCashRequired;
    }

    get_debtServicingCosts()
    {
        return this.debtServicingCosts;
    }

    get_annualProfitOrLoss()
    {
        return this.annualProfitOrLoss;
    }

    get_totalMonthlyProfitOrLoss()
    {
        return this.totalMonthlyProfitOrLoss;
    }

    get_cashflowPerUnitPerMonth()
    {
        return this.cashflowPerUnitPerMonth;
    }

    get_firstMortgageLTV()
    {
        return this.firstMortgageLTV;
    }

    get_firstMortgageLTPP()
    {
        return this.firstMortgageLTPP;
    }

    get_secondMortgageLTV()
    {
        return this.secondMortgageLTV;
    }

    get_secondMortgageLTPP()
    {
        return this.secondMortgageLTPP;
    }

    get_capRateOnPP()
    {
        return this.capRateOnPP;
    }

    get_capRateOnFMV()
    {
        return this.capRateOnFMV;
    }

    get_averageRent()
    {
        return this.averageRent;
    }

    get_grm()
    {
        return this.grm;
    }

    get_dcr()
    {
        return this.dcr;
    }

    get_cashOnCashROI()
    {
        return this.cashOnCashROI;
    }

    get_equityROIAfterOneYear()
    {
        return this.equityROIAfterOneYear;
    }

    get_appreciationROIAfterOneYear()
    {
        return this.appreciationROIAfterOneYear;
    }

    get_totalROIAfterOneYear()
    {
        return this.totalROIAfterOneYear;
    }

    get_forcedAppROIAfterOneYear()
    {
        return this.forcedAppROIAfterOneYear;
    }

    get_expenseToIncomeRatio()
    {
        return this.expenseToIncomeRatio;
    }
}