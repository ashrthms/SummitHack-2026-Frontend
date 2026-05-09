(() => {
  const emissionsForm = document.getElementById('emissions-form');

  if (emissionsForm) {
    const output = document.getElementById('results');
    const averageIntensity = 0.4;

    emissionsForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const usage = Number(document.getElementById('usage').value);
      const intensity = Number(document.getElementById('intensity').value);
      const price = Number(document.getElementById('price').value);

      if (!Number.isFinite(usage) || !Number.isFinite(intensity) || !Number.isFinite(price)) {
        output.textContent = 'Please provide valid numeric values.';
        return;
      }

      const userEmission = usage * intensity;
      const averageEmission = usage * averageIntensity;
      const delta = userEmission - averageEmission;
      const monthlyCost = usage * price;

      const comparison = delta > 0 ? 'above' : delta < 0 ? 'below' : 'equal to';

      output.innerHTML = `
        <p><strong>Your monthly emissions:</strong> ${userEmission.toFixed(1)} kg CO₂</p>
        <p><strong>Average-equivalent emissions:</strong> ${averageEmission.toFixed(1)} kg CO₂</p>
        <p><strong>Comparison:</strong> ${Math.abs(delta).toFixed(1)} kg CO₂ ${comparison} average.</p>
        <p><strong>Estimated monthly cost:</strong> $${monthlyCost.toFixed(2)}</p>
      `;
    });

    emissionsForm.dispatchEvent(new Event('submit'));
  }

  const areaSelect = document.getElementById('area-select');

  if (areaSelect) {
    const heatGrid = document.getElementById('heat-grid');
    const summary = document.getElementById('area-summary');

    const areaData = {
      california: [
        { source: 'Solar', level: 'high' },
        { source: 'Wind', level: 'mid' },
        { source: 'Hydro', level: 'mid' },
        { source: 'Geothermal', level: 'low' },
      ],
      texas: [
        { source: 'Wind', level: 'high' },
        { source: 'Solar', level: 'mid' },
        { source: 'Gas Backup', level: 'high' },
        { source: 'Storage', level: 'low' },
      ],
      midwest: [
        { source: 'Wind', level: 'high' },
        { source: 'Solar', level: 'low' },
        { source: 'Coal Legacy', level: 'high' },
        { source: 'Bioenergy', level: 'mid' },
      ],
      northeast: [
        { source: 'Hydro', level: 'mid' },
        { source: 'Offshore Wind', level: 'mid' },
        { source: 'Solar', level: 'low' },
        { source: 'Nuclear', level: 'high' },
      ],
    };

    const classByLevel = {
      low: 'intensity-low',
      mid: 'intensity-mid',
      high: 'intensity-high',
    };

    const renderArea = (area) => {
      const tiles = areaData[area] || [];
      heatGrid.innerHTML = '';

      for (const tile of tiles) {
        const div = document.createElement('div');
        div.className = `heat-cell ${classByLevel[tile.level]}`;
        div.textContent = tile.source;
        heatGrid.appendChild(div);
      }

      summary.textContent = `Area: ${area}. Colors indicate relative grid intensity (green = cleaner, red = dirtier).`;
    };

    areaSelect.addEventListener('change', () => renderArea(areaSelect.value));
    renderArea(areaSelect.value);
  }
})();
