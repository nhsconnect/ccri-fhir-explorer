package uk.nhs.careconnect.ri.explorer;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;


public class BrexitUrlRewrite implements Processor
{

    @Override
    public void process(Exchange exchange) throws Exception {

        System.out.println(exchange.getIn().getHeader(Exchange.HTTP_PATH));

        String newpath =  exchange.getIn().getHeader("fixpath").toString()
                +exchange.getIn().getHeader(Exchange.HTTP_PATH).toString();
        exchange.getIn().setHeader(Exchange.HTTP_PATH,newpath);
        System.out.println(exchange.getIn().getHeader(Exchange.HTTP_PATH));
    }
}
