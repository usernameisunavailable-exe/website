export default {
  async fetch(request, env) {
    // handle cors preflight
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type",
        }
      });
    }

    if (request.method === "POST") {
      try {
        const { email, name, energyDrink } = await request.json();

        if (!email) return new Response("Missing email", { status: 400 });
        const drinks = {
          "monster-white": "Fehér Monster Ultra",
          "monster-original": "Eredeti zöld Monster",
          "hell-classic": "Hell Classic",
          "hell-apple": "Hell Apple",
          "redbull": "Burzsoá Red Bull",
          "water": "Gyanús Víz"
        };
        
        const chosenDrink = drinks[energyDrink] || "Energiaital";
        
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${env.RESEND_API_KEY}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: "MCP High Command <admin@implodium.dev>",
            to: email,
            subject: `Üdv a pártban, ${name}! :3`,
            html: `
              <h2>Üdv a soraikban, ${name}!</h2>
              <p>A jelentkezési lapodat Kolbászka miniszterjelölt személyesen hitelesítette.</p>
              <p>A havi támogatási adagod (1 tálca <strong>${chosenDrink}</strong>) és a hivatalos állami macskafüleid feladásra kerültek.</p>
              <p><em>Nyah! 🐾</em></p>
            `
          })
        });

        return new Response(JSON.stringify({ success: true }), { 
          status: 200, 
          headers: { 
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json"
          } 
        });
        
      } catch (error) {
        return new Response("Bad request", { status: 400 });
      }
    }
    return new Response("Method not allowed", { status: 405 });
  }
};
