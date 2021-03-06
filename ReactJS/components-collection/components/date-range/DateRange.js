import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import parseInput from './utils/parseInput.js';
import Calendar from './Calendar.js';
import PredefinedRanges from './PredefinedRanges.js';
import getTheme, { defaultClasses } from './styles.js';
import joiningClassNames from 'classnames';
import { MomentFormat } from './constants';
import defaultOptions from './defaultOptions.js';
import Overlay from '../Overlay';

class DateRange extends Component {

  constructor(props, context) {
    super(props, context);

    const { format, linkedCalendars, theme, locale } = props;

    const startDate = parseInput(props.startDate, format, 'startOf');
    const endDate = parseInput(props.endDate, format, 'endOf');
    this.styles = getTheme(theme);
    this.step = 0;
    this.locale = { ...defaultOptions.locale, ...props.locale };
    this.ranges = { ...defaultOptions.ranges(props.today), ...props.ranges };

    this.isValid = true;
    this.currentRange = { startDate, endDate };

    this.state = {
      range: { startDate, endDate },
      link: linkedCalendars && endDate,
      show: false
    }
  }

  get dateRangeText() {
    const range = this.state.range;
    if (range.startDate && range.endDate) {
      const { format } = this.props;
      return `${range.startDate.format(format)} - ${range.endDate.format(format)}`;
    }

    return "";
  }

  show = () => {
    this.step = 0;
    this.setState({ show: true });
  }

  close() {
    this.setState({ show: false });
  }

  componentDidMount() {
    const { onInit } = this.props;
    onInit && onInit(this.state.range);
  }

  orderRange(range) {
    const { startDate, endDate } = range;
    const swap = startDate.isAfter(endDate);

    if (!swap) return range;

    return {
      startDate: endDate,
      endDate: startDate
    }
  }

  setRange(range, triggerChange, show) {
    const { onChange } = this.props
    range = this.orderRange(range);
    this.isValid = this.isValidMonthRange(range);

    const callback = () => {
      triggerChange && onChange && onChange(range, this.isValid);
    }

    if (this.isValid) {
      const newState = show === undefined ? { range } : { range, show };
      this.setState(newState, callback);
    }
    else {
      onChange && onChange(range, this.isValid);
    }
  }

  handleSelect(date) {
    if (date.startDate && date.endDate) { //Select in range
      this.step = 0;
      const showDaterange = false, triggerChange = true;
      return this.setRange(date, triggerChange, showDaterange);
    }

    const { startDate, endDate } = this.state.range;

    const range = {
      startDate: startDate,
      endDate: endDate
    };

    switch (this.step) {
      case 0:
        range['startDate'] = date;
        range['endDate'] = date;
        this.step = 1;
        break;

      case 1:
        range['endDate'] = date;
        this.step = 0;
        break;
    }

    const triggerChange = !this.props.twoStepChange || this.step === 0 && this.props.twoStepChange;
    this.setRange(range, triggerChange);
  }

  isValidMonthRange(date) {
    const { limitedMonthRange } = this.props;

    if (limitedMonthRange) {
      const startDate = date.startDate;
      const endDate = date.endDate;
      const diffMonth = (12 * (endDate.year() - startDate.year())) + endDate.month() - startDate.month() + 1;

      return diffMonth <= limitedMonthRange;
    }

    return true;
  }

  handleLinkChange(newDate) {
    this.setState({
      link: newDate
    });
  }

  handleApply = () => {
    const { onClickApplyButton } = this.props;
    const range = this.state.range;
    this.currentRange = Object.assign({}, range);
    onClickApplyButton && onClickApplyButton(range, this.isValid);
    this.close();
  }

  handleCancel = () => {
    const show = false, triggerChange = true;
    this.setRange(this.currentRange, triggerChange, show);
  }

  componentWillReceiveProps(newProps) {
    // Whenever date props changes, update state with parsed variant
    if (newProps.startDate || newProps.endDate) {
      const format = newProps.format || this.props.format;
      const startDate = newProps.startDate && parseInput(newProps.startDate, format, 'startOf');
      const endDate = newProps.endDate && parseInput(newProps.endDate, format, 'endOf');
      const oldStartDate = this.props.startDate && parseInput(this.props.startDate, format, 'startOf');
      const oldEndDate = this.props.endDate && parseInput(this.props.endDate, format, 'endOf');

      if (!startDate.isSame(oldStartDate) || !endDate.isSame(oldEndDate)) {
        const range = { startDate, endDate };

        this.setRange(range);
      }
    }
  }

  render() {
    const {
      showRange,
      format,
      linkedCalendars,
      style,
      calendars,
      firstDayOfWeek,
      minDate,
      maxDate,
      classNames,
      onlyClasses,
      specialDays,
      lang,
      disableDaysBeforeToday,
      showMonthArrow } = this.props;

    const { range, link } = this.state;
    const { styles } = this;

    const classes = { ...defaultClasses, ...classNames };
    const calendarsCount = Number(calendars) - 1;

    const buttonHandlers = {
      apply: this.handleApply,
      cancel: this.handleCancel
    }

    return (
      <div className="daterange-container">
        <div className="daterange-label" onClick={this.show}>
          <input readOnly name="DateRange" id="DateRange" className="input-text datepicker" type="text" autoComplete="off" value={this.dateRangeText} />
          <i className="icon icon-calendar"></i>
        </div>

        <Overlay isOpening={this.state.show} onClose={this.handleCancel}>
          <div className={classes.dateRange}
            ref={element => this.dateRangeContainer = element}>
            {showRange && (
              <PredefinedRanges
                format={format}
                ranges={this.ranges}
                range={range}
                theme={styles}
                onSelect={this.handleSelect.bind(this)}
                onlyClasses={onlyClasses}
                classNames={classes}
                locale={this.locale}
                buttonHandlers={buttonHandlers} />
            )}

            {(() => {
              const _calendars = [];
              for (var i = calendarsCount; i >= 0; i--) {
                const shownDate = i == calendarsCount ? range.startDate : range.endDate;
                _calendars.push(
                  <Calendar
                    showMonthArrow={showMonthArrow}
                    shownDate={shownDate}
                    disableDaysBeforeToday={disableDaysBeforeToday}
                    lang={lang}
                    key={i}
                    link={linkedCalendars && link}
                    linkCB={this.handleLinkChange.bind(this)}
                    range={range}
                    format={format}
                    firstDayOfWeek={firstDayOfWeek}
                    theme={styles}
                    minDate={minDate}
                    maxDate={maxDate}
                    onlyClasses={onlyClasses}
                    specialDays={specialDays}
                    classNames={classes}
                    onChange={this.handleSelect.bind(this)}
                    locale={this.locale} />
                );
              }
              return _calendars;
            })()}
          </div>
        </Overlay>
      </div>
    );
  }
}

DateRange.defaultProps = {
  linkedCalendars: false,
  theme: {},
  format: MomentFormat.default,
  calendars: 2,
  onlyClasses: true,
  classNames: {},
  specialDays: [],
  twoStepChange: false,
  showRange: true
}

DateRange.propTypes = {
  format: PropTypes.string,
  firstDayOfWeek: PropTypes.number,
  calendars: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  startDate: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  endDate: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  minDate: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  maxDate: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string]),
  dateLimit: PropTypes.func,
  ranges: PropTypes.object,
  linkedCalendars: PropTypes.bool,
  twoStepChange: PropTypes.bool,
  theme: PropTypes.object,
  onInit: PropTypes.func,
  onChange: PropTypes.func,
  onlyClasses: PropTypes.bool,
  specialDays: PropTypes.array,
  classNames: PropTypes.object,
  onClickApplyButton: PropTypes.func,
  showRange: PropTypes.bool,
  limitedMonthRange: PropTypes.number,
  today: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.string])
}

export default DateRange;
