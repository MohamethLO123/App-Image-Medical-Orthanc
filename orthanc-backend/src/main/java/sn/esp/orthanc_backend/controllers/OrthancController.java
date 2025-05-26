package sn.esp.orthanc_backend.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import sn.esp.orthanc_backend.entities.InstanceDTO;
import sn.esp.orthanc_backend.entities.SeriesDTO;
import sn.esp.orthanc_backend.service.OrthancService;

@RestController
@RequestMapping("/api/orthanc")
@CrossOrigin("*")
public class OrthancController {

    @Autowired
    private OrthancService orthancService;

    @GetMapping("/studies")
    public String[] getStudies() {
        return orthancService.getStudies();
    }

    @GetMapping("/studies/{id}")
    public Map<String, Object> getStudyDetails(@PathVariable String id) {
        return orthancService.getStudyDetails(id);
    }
    
    @GetMapping("/studies/{id}/series")
    public SeriesDTO[] getStudySeries(@PathVariable String id) {
        return orthancService.getStudySeries(id);
    }

    @GetMapping("/series/{id}/instances")
    public InstanceDTO[] getSeriesInstances(@PathVariable String id) {
        return orthancService.getSeriesInstances(id);
    }


}

