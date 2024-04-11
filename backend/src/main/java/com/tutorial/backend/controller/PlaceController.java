package com.tutorial.backend.controller;


import com.tutorial.backend.controller.dto.MyPlaceDto;
import com.tutorial.backend.controller.dto.PlaceDto;
import com.tutorial.backend.controller.dto.ResultDto;
import com.tutorial.backend.entity.Member;
import com.tutorial.backend.entity.Place;
import com.tutorial.backend.entity.PlaceHeader;
import com.tutorial.backend.provider.MemberDetail;
import com.tutorial.backend.service.member.MemberService;
import com.tutorial.backend.service.place.PlaceService;
import com.tutorial.backend.service.placeHeader.PlaceHeaderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/place")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class PlaceController {

    private final PlaceService placeService;
    private final PlaceHeaderService placeHeaderService;
    private final MemberService memberService;

    @PostMapping("/save")
    public ResponseEntity<ResultDto<String>> saveOnePlace(@RequestBody PlaceDto placeDto, Authentication authentication){
        MemberDetail principal = (MemberDetail) authentication.getPrincipal();
        PlaceHeader placeHeader = new PlaceHeader();
        placeHeader.setHeaderName(placeDto.getName());
            placeHeader.setMember(principal.getMember());
            PlaceHeader foundPlaceHeader = placeHeaderService.saveOnePlaceHeader(placeHeader);
            placeService.saveOnePlace(foundPlaceHeader.getId(), placeDto);
            return ResponseEntity.ok().body(ResultDto.res(HttpStatus.ACCEPTED, "장소 등록에 성공했습니다!"));

    };
    @GetMapping("/getAll")
    public ResponseEntity<ResultDto<List<MyPlaceDto>>> getAllPlace(Authentication authentication){
        if(authentication != null) {
            MemberDetail memberDetail = (MemberDetail) authentication.getPrincipal();
            Optional<Member> foundMember = memberService.getMemberById(memberDetail.getId());
            if(foundMember.isPresent()){
                List<MyPlaceDto> placeList = placeService.getPlaceListByMemberId(foundMember.get().getId());
                log.info("컨트롤러에서 뽑은 placeList : "+placeList.toString());

                return ResponseEntity.ok().body(ResultDto.res(HttpStatus.ACCEPTED, "성공", placeList));
            } else {
                log.info("회원 정보를 찾을 수 없습니다.");
                return ResponseEntity.badRequest().body(ResultDto.res(HttpStatus.BAD_REQUEST, "사용자 정보를 찾을 수 없습니다."));
            }
        } else {
            log.info("인증된 사용자 정보를 찾을 수 없습니다.");
            return ResponseEntity.badRequest().body(ResultDto.res(HttpStatus.BAD_REQUEST, "사용자 정보를 찾을 수 없습니다."));
        }
    }


}
