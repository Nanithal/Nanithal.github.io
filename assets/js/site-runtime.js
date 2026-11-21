(() => {
    const runtime = document.getElementById('site-runtime');
    const days = document.getElementById('site-runtime-days');
    if (!runtime || !days) return;

    // The baseline includes +08:00, so every boundary is Shanghai midnight,
    // regardless of the visitor's own time zone.
    const baseline = Date.parse(runtime.dataset.baseline);
    const baseDays = Number(runtime.dataset.baseDays);
    if (!Number.isFinite(baseline) || !Number.isFinite(baseDays)) return;

    const dayMs = 24 * 60 * 60 * 1000;
    let timer;

    function update() {
        clearTimeout(timer);
        const now = Date.now();
        const elapsedDays = Math.max(0, Math.floor((now - baseline) / dayMs));
        days.textContent = String(baseDays + elapsedDays);

        const nextMidnight = baseline + (elapsedDays + 1) * dayMs;
        timer = setTimeout(update, Math.min(dayMs, Math.max(100, nextMidnight - now + 50)));
    }

    update();
    // Refresh after a sleeping/background tab becomes visible again.
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) update();
    });
})();
