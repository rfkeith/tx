/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fcl.tx;

import java.io.IOException;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;
import org.glassfish.jersey.media.sse.EventOutput;
import org.glassfish.jersey.media.sse.OutboundEvent;
import org.glassfish.jersey.media.sse.SseFeature;

/**
 *
 * @author rfk
 */
@Path("events")
public class DocumentEventsResource {

    @GET
    @Path("documents")
    @Produces(SseFeature.SERVER_SENT_EVENTS)
    public EventOutput getDocumentEvents() {
        EventOutput output = new EventOutput();
        new Thread(() -> {
            for (int i = 0; i < 10; i++) {
                OutboundEvent.Builder b = new OutboundEvent.Builder();
                b.name("message");
                b.data(String.class, "{\"message\" : \"Hellow There\"}");
                try {
                    output.write(b.build());
                } catch (IOException ex) {
                    Logger.getLogger(DocumentEventsResource.class.getName()).log(Level.SEVERE, null, ex);
                    try {
                        output.close();
                    } catch (IOException ex1) {
                        Logger.getLogger(DocumentEventsResource.class.getName()).log(Level.SEVERE, null, ex1);
                    }
                }
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException ex) {
                    Logger.getLogger(DocumentEventsResource.class.getName()).log(Level.SEVERE, null, ex);
                }
                System.out.println("Sent Event");
            }
        }).start();
        return output;
    }

    @GET
    @Path("echo")
    public Response echoThis() {
        return Response.ok("HELLO THERE").build();
    }

}
