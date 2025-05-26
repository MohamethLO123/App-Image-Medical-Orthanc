package sn.esp.orthanc_backend.entities;

import lombok.Data;
import java.util.Map;

@Data
public class InstanceDTO {
    private String ID;
    private Map<String, Object> MainDicomTags;
    private Integer FileSize;
}
