package VilageFcstInfoService;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class VilagefcstinfoserviceResponse{
private Response response;

@Getter
@Setter
public static class Response {
private Header header;
private Body body;
}

@Getter
@Setter
public static class Header {
            private Integer resultCode;
            private String resultMsg;
}

@Getter
@Setter
public static class Body {
private String dataType;
private Items items;
private String pageNo;
private String numOfRows;
private String totalCount;
}

@Getter
@Setter
public static class Items {
private List<Item> item;
    }

    @Getter
    @Setter
    public static class Item {
                private Integer numOfRows;
                private Integer pageNo;
                private Integer totalCount;
                private String dataType;
                private String baseDate;
                private Integer baseTime;
                private Integer nx;
                private Integer ny;
                private String category;
                private Integer obsrValue;
    }
    }
