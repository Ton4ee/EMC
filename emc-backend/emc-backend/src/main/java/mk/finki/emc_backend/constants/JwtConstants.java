package mk.finki.emc_backend.constants;

public class JwtConstants {
    public static final String SECRET = "my-secret-key-should-be-long";  // TODO move to env var
    public static final long EXPIRATION = 1000 * 60 * 60 * 24;           // 24 h
}
