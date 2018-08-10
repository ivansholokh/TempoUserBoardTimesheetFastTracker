alert(getIssueCodes('2018-08-06', '2018-08-10'));

/**
* Date format 2018-08-01 (YYYY-MM-DD)
* Must be included moment.js and jQuery
* @param from
* @param to
* @returns {string}
*/
function getIssueCodes (from, to) {
  var issueCodes = [],
    fromDate     = moment(from),
    toDate       = moment(to),
    diffInDays   = toDate.diff(fromDate, 'days');

  if (diffInDays < 0) { return 'Start date must be grated than end date'; }
  for (i = 0, b = 0; i <= diffInDays; i++) {
    let date = fromDate.add(b, 'days').format('YYYY-MM-DD');

    $.each(
    $('#issuetable tbody td.value-cell[target-date="' + date + '"]'),
    function (index, currentDayTd) {
      let ticketIssueTitle = $(currentDayTd).parent().find('td.issuekey a').attr('title');
      if ($.inArray(ticketIssueTitle, issueCodes) < 0) {
        issueCodes.push(ticketIssueTitle);
      }
    });
    b = 1;
  }

  return $.unique(issueCodes).join(', ');
}
