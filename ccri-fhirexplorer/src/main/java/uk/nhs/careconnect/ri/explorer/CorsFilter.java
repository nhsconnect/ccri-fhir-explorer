package uk.nhs.careconnect.ri.explorer;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class CorsFilter implements Filter {

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(CorsFilter.class);

    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {

        HttpServletResponse response = (HttpServletResponse) res;
        HttpServletRequest request = (HttpServletRequest) req;
        log.debug("Cors Filter: "+request.getMethod());
        // response.setHeader("Smegster", "*");
        if (request.getMethod() != null && request.getMethod().equals("OPTIONS")) {
            if (response.getHeader("Access-Control-Allow-Origin") == null || response.getHeader("Access-Control-Allow-Origin").isEmpty()) {
                response.setHeader("Access-Control-Allow-Origin", "*");
            }
            if (response.getHeader("Access-Control-Allow-Methods") == null || response.getHeader("Access-Control-Allow-Methods").isEmpty()) {
                response.setHeader("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS, DELETE");
            }
            if (response.getHeader("Access-Control-Max-Age") == null || response.getHeader("Access-Control-Max-Age").isEmpty()) {
                response.setHeader("Access-Control-Max-Age", "3600");
            }
            if (response.getHeader("Access-Control-Allow-Headers") == null || response.getHeader("Access-Control-Allow-Header").isEmpty()) {
                response.setHeader("Access-Control-Allow-Headers", "X-FHIR-Starter,authorization,Prefer,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers");
            }
        }
            if (!"OPTIONS".equals(request.getMethod())) {
                chain.doFilter(req, res);
            }

    }

    @Override
    public void init(FilterConfig filterConfig) {
    }

    @Override
    public void destroy() {
    }
}
