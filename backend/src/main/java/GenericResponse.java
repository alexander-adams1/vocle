import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;
import com.squareup.moshi.Moshi.Builder;
import com.squareup.moshi.Types;
import java.lang.reflect.Type;
import java.util.Collections;
import java.util.Map;

/** Defines the serialize method; converting a Map to a JSON */
public record GenericResponse(Map<String, Object> results) {

  /**
   * Serializes the Map object passed to the record
   *
   * @return the Map object passed to the record in JSON form
   */
  public String serialize() {
    // responseMap is set to a defensive copy of the map passed
    Map<String, Object> responseMap = Collections.unmodifiableMap(this.results);
    Moshi moshi = new Builder().build();
    Type mapType = Types.newParameterizedType(Map.class, String.class, Object.class);
    JsonAdapter<Map<String, Object>> jsonAdapter = moshi.adapter(mapType);
    return jsonAdapter.toJson(responseMap);
  }
}
