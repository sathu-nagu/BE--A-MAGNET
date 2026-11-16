(() => {
  const baseUrl = "https://vdk-viber-runtime-prod.bot.botpress.host";
  const botId = "f4366326-3584-485e-9e8f-e58107c289a8";
  const stylesheet = document.createElement("link");
  stylesheet.rel = "stylesheet";
  stylesheet.href = `${baseUrl}/edge/webchat.css`;
  document.head.appendChild(stylesheet);

  const script = document.createElement("script");
  script.src = `${baseUrl}/edge/webchat.js`;
  script.async = true;
  script.addEventListener("load", () => {
    fetch(`${baseUrl}/edge/bots/${botId}/config`)
      .then(response => {
        if (!response.ok) throw new Error(`Bot configuration returned ${response.status}`);
        return response.json();
      })
      .then(({ webchat }) => {
        if (!webchat || !window.VdkEdgeWebchat) throw new Error("Botpress webchat failed to initialize");
        window.VdkEdgeWebchat.mount({ ...webchat, mode: "bubble", baseUrl, botId });
      })
      .catch(error => console.error("Could not load the BE A MAGNET chat widget.", error));
  });
  script.addEventListener("error", () => console.error("Could not load the Botpress webchat script."));
  document.head.appendChild(script);
})();
