package com.tutorial.backend.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import javax.persistence.Id;
import java.time.LocalDateTime;

@Document(collection = "tbl_message")
@Getter @Setter
@NoArgsConstructor
public class Message {

    @Id
    private String id;

    @Field(name = "msg_content")
    private String msgContent;

    @Field(name = "msg_time_stamp")
    private LocalDateTime msgTimeStamp;

    @Field(name = "msg_is_image")
    private Boolean msgIsImage;

    @Field(name = "is_deleted")
    private Boolean isDeleted;

    @Field(name = "view_count")
    private Long viewCount;

    @Field(name = "matching_header_id")
    private Long matchingHeaderId;

    @Field(name = "member_id")
    private Long memberId;
}
