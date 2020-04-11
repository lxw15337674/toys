var regexpRules = {
  phone: (value) => {
    return (
      new RegExp(
        /^((13[0-9])|(14[5,7,9])|(15([0-3]|[5-9]))|(16([2,5,6,7]|[5-9]))|(17[0,1,3,5,6,7,8])|(18[0-9])|(19[1,8,9]))\d{8}$/im,
      ).test(value) || RegExp(/^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/).test(value)
    );
  },
  email: (value) => {
    return RegExp(/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/).test(value);
  },
  age: (value) => {
    return RegExp(/^[0-9]{0,2}$/im).test(value);
  },
  url: (value) => {
    return RegExp(
      /^((https|http|ftp|rtsp|mms)?:\/\/)+[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/im,
    ).test(value);
  },
  // 匹配不包含特殊字符的内容
  checkNoSpecificKey: (value) => {
    return !RegExp(
      /[`~!@#$%^&*()_\-+=<>?:"{}|,.\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/im,
    ).test(value);
  },
  // 首尾空格校验
  validateHeadTailEmpty: (val) => {
    return !RegExp(/(^\s+)|(\s+$)/g).test(val);
  },
  // 数据库保留字段校验
  checkSqlReservedField: (value) => {
    let reservedList =
      'ADD ALL ALTER ' +
      'ANALYZE AND AS ' +
      'ASC ASENSITIVE BEFORE ' +
      'BETWEEN BIGINT BINARY ' +
      'BLOB BOTH BY ' +
      'CALL CASCADE CASE ' +
      'CHANGE CHAR CHARACTER ' +
      'CHECK COLLATE COLUMN ' +
      'CONDITION CONNECTION CONSTRAINT ' +
      'CONTINUE CONVERT CREATE ' +
      'CROSS CURRENT_DATE CURRENT_TIME ' +
      'CURRENT_TIMESTAMP CURRENT_USER CURSOR ' +
      'DATABASE DATABASES DAY_HOUR ' +
      'DAY_MICROSECOND DAY_MINUTE DAY_SECOND ' +
      'DEC DECIMAL DECLARE ' +
      'DEFAULT DELAYED DELETE ' +
      'DESC DESCRIBE DETERMINISTIC ' +
      'DISTINCT DISTINCTROW DIV ' +
      'DOUBLE DROP DUAL ' +
      'EACH ELSE ELSEIF ' +
      'ENCLOSED ESCAPED EXISTS ' +
      'EXIT EXPLAIN FALSE ' +
      'FETCH FLOAT FLOAT4 ' +
      'FLOAT8 FOR FORCE ' +
      'FOREIGN FROM FULLTEXT ' +
      'GOTO GRANT GROUP ' +
      'HAVING HIGH_PRIORITY HOUR_MICROSECOND ' +
      'HOUR_MINUTE HOUR_SECOND IF ' +
      'IGNORE IN INDEX ' +
      'INFILE INNER INOUT ' +
      'INSENSITIVE INSERT INT ' +
      'INT1 INT2 INT3 ' +
      'INT4 INT8 INTEGER ' +
      'INTERVAL INTO IS ' +
      'ITERATE JOIN KEY ' +
      'KEYS KILL LABEL ' +
      'LEADING LEAVE LEFT ' +
      'LIKE LIMIT LINEAR ' +
      'LINES LOAD LOCALTIME ' +
      'LOCALTIMESTAMP LOCK LONG ' +
      'LONGBLOB LONGTEXT LOOP ' +
      'LOW_PRIORITY MATCH MEDIUMBLOB ' +
      'MEDIUMINT MEDIUMTEXT MIDDLEINT ' +
      'MINUTE_MICROSECOND MINUTE_SECOND MOD ' +
      'MODIFIES NATURAL NOT ' +
      'NO_WRITE_TO_BINLOG NULL NUMERIC ' +
      'ON OPTIMIZE OPTION ' +
      'OPTIONALLY OR ORDER ' +
      'OUT OUTER OUTFILE ' +
      'PRECISION PRIMARY PROCEDURE ' +
      'PURGE RAID0 RANGE ' +
      'READ READS REAL ' +
      'REFERENCES REGEXP RELEASE ' +
      'RENAME REPEAT REPLACE ' +
      'REQUIRE RESTRICT RETURN ' +
      'REVOKE RIGHT RLIKE ' +
      'SCHEMA SCHEMAS SECOND_MICROSECOND ' +
      'SELECT SENSITIVE SEPARATOR ' +
      'SET SHOW SMALLINT ' +
      'SPATIAL SPECIFIC SQL ' +
      'SQLEXCEPTION SQLSTATE SQLWARNING ' +
      'SQL_BIG_RESULT SQL_CALC_FOUND_ROWS SQL_SMALL_RESULT ' +
      'SSL STARTING STRAIGHT_JOIN ' +
      'TABLE TERMINATED THEN ' +
      'TINYBLOB TINYINT TINYTEXT ' +
      'TO TRAILING TRIGGER ' +
      'TRUE UNDO UNION ' +
      'UNIQUE UNLOCK UNSIGNED ' +
      'UPDATE USAGE USE ' +
      'USING UTC_DATE ' +
      'UTC_TIME UTC_TIMESTAMP VALUES ' +
      'VARBINARY VARCHAR VARCHARACTER ' +
      'VARYING WHEN WHERE ' +
      'WHILE WITH WRITE ' +
      'X509 XOR YEAR_MONTH ' +
      'ZEROFILL';
    //等于-1则不存在，校验通过
    return reservedList.split(' ').indexOf(value.toUpperCase()) !== -1;
  },
  // 只能是英文或_
  checkEngOrSomeSpeWords: (val) => {
    return RegExp(/^[a-z_]*$/gi).test(val);
  },
  number: (value) => {
    let reg = /^[0-9]*$/;
    return reg.test(value);
  },
  /**
   * 匹配身份证
   * @param value
   * @returns {number}
   */
  identityNumber: function(value) {
    var flag = 1;
    var pattern = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i;

    value.toString().match(pattern) ? (flag = 1) : (flag = 0);
    return flag;
  },
  // 信用代码
  creditCode: (value) => {
    return RegExp(/^[^_IOZSVa-z\W]{2}\d{6}[^_IOZSVa-z\W]{10}$/).test(value);
  },
  /**
   * 只能输入中文、英文、数字、下划线和连接线，不能有空格
   */
  onlyWordAndNum: (val) => {
    let reg = /^[\w\u4e00-\u9fa5\-_]*$/;
    return reg.test(val);
  },
  // 有效性校验
  ContainValidCharacters: (value) => {
    // 至少含有一个数字、字母或汉字
    let contaiNumb = RegExp(/[0-9]{1,}/).test(value);
    let containChar = RegExp(/[a-zA-Z]{1,}/).test(value);
    let containChinese = RegExp(/[\u4e00-\u9fa5]{1,}/).test(value);
    return containChar || contaiNumb || containChinese;
  },
  // 反斜杠校验
  validateBackslash: function(val) {
    return RegExp(/(\\)+/g).test(val);
  },
};

export default regexpRules;
