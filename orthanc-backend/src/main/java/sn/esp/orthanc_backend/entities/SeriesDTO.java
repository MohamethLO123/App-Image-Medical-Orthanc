package sn.esp.orthanc_backend.entities;


import lombok.Data;
import java.util.Map;

@Data
public class SeriesDTO {
    private String ID;
    private Map<String, Object> MainDicomTags;
}
