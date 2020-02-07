'use strict'

var taxpayerDetails = require('../models/taxpayerDetailsModel.js');

const constant_helper = require('../utils/constant_helper');

class CommonValidator {
    static validateTaxpayerDetails(tp, page) {
        var error_messages = [];
        console.log(`Validating taxpayer at page ${page} :`, tp);

        if (!tp || !tp.tin) {
            error_messages.push({ page, field: "taxpayer.tin", error: constant_helper.MANDATORY_FIELD('TIN') });
        }

        if (!tp || !tp.rdo_code) {
            error_messages.push({ page, field: "taxpayer.rdo_code", error: constant_helper.MANDATORY_FIELD('RDO Code') });
        }

        if (!tp || !tp.registered_name) {
            error_messages.push({ page, field: "taxpayer.registered_name", error: constant_helper.MANDATORY_FIELD('Registered Name') });
        }

        if (!tp || !tp.contact_details || !tp.contact_details.telno) {
            error_messages.push({ page, field: "taxpayer.contact_details.telno", error: constant_helper.MANDATORY_FIELD('Contact Number/Telephone no') });
        }
        if (!tp || !tp.address) {
            error_messages.push({ page, field: "taxpayer.address", error: constant_helper.MANDATORY_FIELD('Registered Address') });
        }

        if (!tp || !tp.address_details || !tp.address_details.zipCode) {
            error_messages.push({ page, field: "taxpayer.address_details.zipCode", error: constant_helper.MANDATORY_FIELD('Zip Code') });
        }

        return error_messages;

    }

    static isFutureDate(idate) {
        var today = new Date().getTime(),
            idate = idate.split("/");

        idate = new Date(idate[2], idate[1] - 1, idate[0]).getTime();
        return (today - idate) < 0 ? true : false;
    }

    /**
     * 
     * @param {Date} due_date 
     */
    static isLateFiling(due_date) {
        console.log("Due date :", due_date);
        return new Date().getTime() > new Date(due_date).getTime();
    }

    static computeSurcharges(amount) {
        var surcharge = 0;

        if (amount > 0.0) {
            surcharge = amount * 0.25;
        } else {
            surcharge = 0.0;
        }

        if (amount < 0.0) {
            amount = 0.0;
        }

        return surcharge;
    }

    /**
     * 
     * @param {Date} due_date 
     * @param {Number} amount 
     */
    static computeInterest(due_date, amount) {
        var interest = 0;
        var dayDifference = 0;

        var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
        var firstDate = due_date;
        var secondDate = new Date();

        if (!amount || amount <= 0) {
            interest = 0;
        } else {
            dayDifference = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
            interest = (amount * 20 / 100 * dayDifference) / 365;
        }

        return interest;
    }

    static computeCompromise() {
        // Mock amount
        return 1000;
    }

    static validateMandatory(value, message) {

    }

    static formatAmount(amount, show_sign) {
        if (!amount || isNaN(amount)) return show_sign ? "₱ 0.00" : "0.00";
        var parts = parseFloat(amount).toFixed(2).toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return show_sign ? `₱ ${parts.join(".")}` : parts.join(".");
    }

    static checkDueDate(form_details, page) {
        var error_messages = [];
        console.log(`Checking due date if late filing at page ${page}`);
        if (this.isLateFiling(form_details.due_date)) {
            console.log("Late filing...")
            // error_messages.push({
            //     page,
            //     field: 'latefiling',
            //     error: 'Late Filing'
            // })
            // Compute Surcharge
            console.log('###check form :', form_details);
            const surcharge = this.computeSurcharges(form_details.tax_due);
            form_details.surcharge = form_details.surcharge ? parseFloat(form_details.surcharge).toFixed(2) : "0.00";
            console.log('Surcharge Comparison :', surcharge, ':', form_details.surcharge);
            if (form_details.surcharge !== surcharge.toFixed(2)) {
                error_messages.push({
                    page,
                    field: 'surcharge',
                    error: `Computed surcharge ${this.formatAmount(surcharge, true)}`,
                    required_value: surcharge.toFixed(2)
                })
            }
            // Compute Interest
            const interest = this.computeInterest(form_details.due_date, form_details.tax_due);
            form_details.interest = form_details.interest ? parseFloat(form_details.interest).toFixed(2) : "0.00";
            console.log('Interest Comparison :', interest, ':', form_details.interest);
            if (form_details.interest !== interest.toFixed(2)) {
                error_messages.push({
                    page,
                    field: 'interest',
                    error: `Computed interest ${this.formatAmount(interest, true)}`,
                    required_value: interest.toFixed(2)
                })
            }
            // Compute Compromise
            const compromise = this.computeCompromise(form_details.due_date, form_details.tax_due);
            form_details.compromise = form_details.compromise ? parseFloat(form_details.compromise).toFixed(2) : "0.00";
            console.log('Compromise Comparison :', compromise, ':', form_details.compromise);
            if (form_details.compromise !== compromise.toFixed(2)) {
                error_messages.push({
                    page,
                    field: 'compromise',
                    error: `Computed compromise ${this.formatAmount(compromise, true)}`,
                    required_value: compromise.toFixed(2)
                })
                console.log('error_messages :', error_messages);
            }
        }
        return { error_messages, form_details };
    }

    static checkNestedDueDate(form, nested_field, page) {
        console.log('form :', form);
        var nested_form = {}
        if (form[nested_field]) {
            nested_form = form[nested_field];
        } else form[nested_field] = {}
        nested_form.due_date = form.due_date;
        console.log('nested_form :', nested_form);
        var { error_messages, form_details } = this.checkDueDate(nested_form, page);
        console.log('error_messages :', error_messages);
        form[nested_field] = form_details
        var errors = [];
        errors = error_messages.map(v => {
            v.field = `${nested_field}.${v.field}`;
            return v
        })
        console.log('checkNestedDueDate errors :', errors);
        return { error_messages: errors, form_details: form }
    }

    static validateReturnPeriodByQuarter(year, quarter, page) {
        var errors = [];
        console.log('year :', year);
        if (!year) {
            errors.push({ page, field: "return_period_year", error: constant_helper.MANDATORY_FIELD('For the year') });
        }
        if (!quarter) {
            errors.push({ page, field: "quarter", error: constant_helper.MANDATORY_FIELD('Quarter') });
        }

        if (errors.length) return { errors };

        var quarterly = [2, 5, 8, 11];
        var return_period = new Date(year, quarterly[quarter] + 1, 0);
        return { errors: null, return_period };
    }

    static validateReturnPeriodByMonthYear(year, month, page) {
        var errors = [];
        if (!year || !month) {
            errors.push({ page, field: "return_period", error: constant_helper.MANDATORY_FIELD('Return Period') });
            return { errors };
        }

        var return_period = new Date(year, month + 1, 0);
        return { errors, return_period };
    }

    /**
     * @param {Object} reference 
     * @param {Object} form 
     */
    static validateReturnPeriod(reference, form) {
        console.log('reference :', reference);
        // Compute Return Period
        if (reference.period_type === 'm') {
            if (!form.return_period_year || (!form.return_period_month && form.return_period_month !== 0)) {
                return { errors: [{ page: 0, field: "return_period", error: constant_helper.MANDATORY_FIELD('Return Period') }] }
            }
            form.return_period = new Date(form.return_period_year, form.return_period_month + 1, 0);
        } else if (reference.period_type === 'q') {
            var errors = [];
            form.accounting_type = reference.is_calendar ? 'c' : form.accounting_type;
            if (form.accounting_type === 'c') {
                form.start_month = 0;
                form.end_month = 11;
            }
            if (!form.accounting_type) {
                errors.push({ page: 0, field: "accounting_type", error: constant_helper.MANDATORY_FIELD('Please select if Calendar or Fiscal') });
            }
            if (!form.start_month && !form.end_month) {
                errors.push({ page: 0, field: "return_period", error: constant_helper.MANDATORY_FIELD('For the year') });
            } else if (!form.return_period_year) {
                errors.push({ page: 0, field: "return_period_year", error: constant_helper.MANDATORY_FIELD('For the year') });
            }
            if (!form.quarter) {
                errors.push({ page: 0, field: "quarter", error: constant_helper.MANDATORY_FIELD('Quarter') });
            }
            if (errors.length) return { errors };

            if (form.accounting_type === 'f') {
                if (!form.start_month) {
                    const startMonthDate = new Date(form.return_period_year, form.end_month + 1, 1);
                    form.start_month = startMonthDate.getMonth();
                } else if (!form.end_month) {
                    const endMonthDate = new Date(form.return_period_year, form.start_month - 1, 1);
                    form.end_month = endMonthDate.getMonth();
                }
            }
            form.return_period = new Date(form.return_period_year, form.end_month + (form.quarter * 3) + 1, 0);
        } else if (reference.period_type === 'a') {
            form.accounting_type = reference.is_calendar ? 'c' : form.accounting_type;
            if (!form.accounting_type) {
                return { errors: [{ page: 0, field: "accounting_type", error: constant_helper.MANDATORY_FIELD('For the year') }] };
            }
            if (!form.return_period_year) {
                return { errors: [{ page: 0, field: "return_period_year", error: constant_helper.MANDATORY_FIELD('For the year') }] };
            }
            form.return_period = new Date(form.return_period_year, 12, 0);
        } else if (!form.return_period) {
            return { errors: [{ page: 0, field: "return_period", error: constant_helper.MANDATORY_FIELD('Return Period') }] }
        }
        console.log('return_period :', new Date(form.return_period).toString());



        // Compute Due Date
        if (reference.fixed_due_date) { // if there is a fixed due date
            form.due_date = new Date(fixed_due_date)
        } else {
            var due_date = new Date(form.return_period);
            var day_of_month = reference.day_offset;
            // due_date.setDate(1); // to prevent adding extra month if the month that is going to be set excess the current day of the month
            due_date.setMonth(due_date.getMonth() + reference.month_offset);
            if (reference.day_offset <= 0) {
                var endOfMonth = new Date(due_date.getFullYear(), due_date.getMonth() + 1, 0);
                day_of_month = endOfMonth.getDate() + reference.day_offset;
            }
            var current_date = due_date.getDate();
            if (reference.month_offset > 0) current_date = 0;
            due_date.setDate(current_date + day_of_month);
            form.due_date = due_date;
            console.log('due_date :', due_date.toString());
        }
        return { errors: null, form }
    }
}

module.exports = CommonValidator
