package com.openmind.ezdg.BeachInfoservice;

public class SunInfoBeachRequest {
    /**
    * 공공데이터포털에서 받은 인증키
    */
    private String serviceKey;

    /**
    * 페이지번호한 페이지 결과 수
    */
    private String numOfRows;

    /**
    * 한 페이지 결과 수
    */
    private String pageNo;

    /**
    * 응답자료형식
    */
    private String dataType;

    /**
    * 발표일자
    */
    private String Base_date;

    /**
    * 해변코드
    */
    private String beach_num;

    // Getters and Setters
    public String getServiceKey() {
    return serviceKey;
    }

    public void setServiceKey(String serviceKey) {
    this.serviceKey = serviceKey;
    }

    public String getNumOfRows() {
    return numOfRows;
    }

    public void setNumOfRows(String numOfRows) {
    this.numOfRows = numOfRows;
    }

    public String getPageNo() {
    return pageNo;
    }

    public void setPageNo(String pageNo) {
    this.pageNo = pageNo;
    }

    public String getDataType() {
    return dataType;
    }

    public void setDataType(String dataType) {
    this.dataType = dataType;
    }

    public String getBase_date() {
    return Base_date;
    }

    public void setBase_date(String Base_date) {
    this.Base_date = Base_date;
    }

    public String getBeach_num() {
    return beach_num;
    }

    public void setBeach_num(String beach_num) {
    this.beach_num = beach_num;
    }

}