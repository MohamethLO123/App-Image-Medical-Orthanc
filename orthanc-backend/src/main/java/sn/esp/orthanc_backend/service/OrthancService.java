package sn.esp.orthanc_backend.service;


import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import sn.esp.orthanc_backend.entities.InstanceDTO;
import sn.esp.orthanc_backend.entities.SeriesDTO;

@Service
public class OrthancService {

    private final String ORTHANC_URL = "http://localhost:8042";

    @Autowired
    private RestTemplate restTemplate;

    public String[] getStudies() {
        return restTemplate.getForObject(ORTHANC_URL + "/studies", String[].class);
    }

    public Map<String, Object> getStudyDetails(String id) {
        String url = ORTHANC_URL + "/studies/" + id;
        return restTemplate.getForObject(url, Map.class);
    }

    public SeriesDTO[] getStudySeries(String studyId) {
        String url = ORTHANC_URL + "/studies/" + studyId + "/series";
        return restTemplate.getForObject(url, SeriesDTO[].class);
    }

    public InstanceDTO[] getSeriesInstances(String seriesId) {
        String url = ORTHANC_URL + "/series/" + seriesId + "/instances";
        return restTemplate.getForObject(url, InstanceDTO[].class);
    }


}

