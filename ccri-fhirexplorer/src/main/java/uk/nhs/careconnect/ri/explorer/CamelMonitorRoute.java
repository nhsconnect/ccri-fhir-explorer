package uk.nhs.careconnect.ri.explorer;

import org.apache.camel.*;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.component.http4.HttpComponent;
import org.apache.camel.util.jsse.KeyManagersParameters;
import org.apache.camel.util.jsse.KeyStoreParameters;
import org.apache.camel.util.jsse.SSLContextParameters;
import org.apache.camel.util.jsse.TrustManagersParameters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

@Component
public class CamelMonitorRoute extends RouteBuilder {

	@Autowired
	protected Environment env;


	private String gpcAuth="Bearer eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJpc3MiOiJodHRwczovL29yYW5nZS50ZXN0bGFiLm5ocy51ay9ncGNvbm5lY3QtZGVtb25zdHJhdG9yL3YxLyIsInN1YiI6IjEiLCJhdWQiOiJodHRwczovL2F1dGhvcml6ZS5maGlyLm5ocy5uZXQvdG9rZW4iLCJleHAiOjE1Mzk1MzA1OTcsImlhdCI6MTUzOTUzMDI5NywicmVhc29uX2Zvcl9yZXF1ZXN0IjoiZGlyZWN0Y2FyZSIsInJlcXVlc3RlZF9zY29wZSI6InBhdGllbnQvKi5yZWFkIiwicmVxdWVzdGluZ19kZXZpY2UiOnsicmVzb3VyY2VUeXBlIjoiRGV2aWNlIiwiaWQiOiIxIiwiaWRlbnRpZmllciI6W3sic3lzdGVtIjoiV2ViIEludGVyZmFjZSIsInZhbHVlIjoiR1AgQ29ubmVjdCBEZW1vbnN0cmF0b3IifV0sInR5cGUiOnsiY29kaW5nIjpbeyJzeXN0ZW0iOiJEZXZpY2VJZGVudGlmaWVyU3lzdGVtIiwiY29kZSI6IkRldmljZUlkZW50aWZpZXIifV19LCJtb2RlbCI6InYxIiwidmVyc2lvbiI6IjEuMSJ9LCJyZXF1ZXN0aW5nX29yZ2FuaXphdGlvbiI6eyJyZXNvdXJjZVR5cGUiOiJPcmdhbml6YXRpb24iLCJpZCI6IjEiLCJpZGVudGlmaWVyIjpbeyJzeXN0ZW0iOiJodHRwczovL2ZoaXIubmhzLnVrL0lkL29kcy1vcmdhbml6YXRpb24tY29kZSIsInZhbHVlIjoiW09EU0NvZGVdIn1dfSwicmVxdWVzdGluZ19wcmFjdGl0aW9uZXIiOnsicmVzb3VyY2VUeXBlIjoiUHJhY3RpdGlvbmVyIiwiaWQiOiIxIiwiaWRlbnRpZmllciI6W3sic3lzdGVtIjoiaHR0cHM6Ly9maGlyLm5ocy51ay9JZC9zZHMtdXNlci1pZCIsInZhbHVlIjoiRzEzNTc5MTM1In0seyJzeXN0ZW0iOiJsb2NhbFN5c3RlbSIsInZhbHVlIjoiMSJ9XSwibmFtZSI6W3siZmFtaWx5IjoiRGVtb25zdHJhdG9yIiwiZ2l2ZW4iOlsiR1BDb25uZWN0Il0sInByZWZpeCI6WyJNciJdfV19fQ.";

	@Value("${jolokia.jmxendpoint.ccriserver}")
	private String jmxCCRIServer;

	@Value("${jolokia.jmxendpoint.ccridocument}")
	private String jmxCCRIDocument;

	@Value("${jolokia.jmxendpoint.ccriintegration}")
	private String jmxCCRIIntegration;

	@Value("${fhir.resource.serverBase}")
	private String serverBase;

	@Value("${oauth2.client_id}")
	private String oauth2client_id;

	@Value("${oauth2.client_secret}")
	private String oauth2client_secret;

	@Value("${oauth2.cookie_domain}")
	private String oauth2cookie_domain;

	@Value("${conf.logon}")
	private String logonUrl;

    @Override
    public void configure() 
    {

		restConfiguration()
				.component("servlet")
				.contextPath("api")
				.dataFormatProperty("prettyPrint", "true")
				.enableCORS(true);


		log.info("Starting Camel Route MAIN FHIR Server = " + serverBase);


		rest("/config")
				.get("/http").to("direct:hello");

		from("direct:hello")
				.routeId("helloTest")
				.transform().constant("{ \"fhirServer\": \""+serverBase+"\", "
				+"\"logonUrl\": \""+logonUrl+"\", "
				+"\"oauth2client_id\": \""+oauth2client_id+"\", "
				+"\"oauth2client_secret\": \""+oauth2client_secret+"\", "
				+"\"oauth2cookie_domain\": \""+oauth2cookie_domain+"\""
				+ " }");

		rest("/fhir")
				.get("/ods/{path}").to("direct:ods")
				.get("/nrls/{path}").to("direct:nrls")
				.get("/gpc/{path}").to("direct:gpc")
				.get("/gpc/{path}/{id}").to("direct:gpc")
				.post("/gpc/{path}/{id}").to("direct:gpc");




		from("servlet:ccri-fhirserver?matchOnUriPrefix=true")
				.routeId("ccri-fhiserver-jokolia")
			.to(jmxCCRIServer);

		from("servlet:ccri-integration?matchOnUriPrefix=true")
				.routeId("ccri-integration-jokolia")
				.to(jmxCCRIIntegration);

		from("servlet:ccri-document?matchOnUriPrefix=true")
				.routeId("ccri-document-jokolia")
				.to(jmxCCRIDocument);


    }


}
