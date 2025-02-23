package com.openmind.ezdg.algolia;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AlgoliaSearchFileDto {
    private String originalName;
    private String id;
    private String type;
}
