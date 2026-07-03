# Visualizations

All matplotlib figures emitted by `scripts/*.py` land in this directory.
Files are checked into git so the figures stay browsable on GitHub
without rerunning the scripts.

## Regenerating

To regenerate every figure in one shot, from the **repo root**:

```powershell
python scripts/run_all_visualizations.py            # all 41 scripts, ~4.5 min
python scripts/run_all_visualizations.py --only mnist_neural_applications
python scripts/run_all_visualizations.py --skip phi_pi_fractals corner_region_fractal
python scripts/run_all_visualizations.py --verbose
```

The runner sets `MPLBACKEND=Agg` so any leftover `plt.show()` calls are
no-ops, and reports per-script success/failure plus how many new figure
filenames each script created.

To run a single script directly, use the repo root as the working
directory (every script writes with the relative path
`visualizations/<name>.png`):

```powershell
python scripts/pi_half_discovery.py
python scripts/corner_region_fractal.py
```

## Convention for new figures

```python
plt.savefig("visualizations/my_new_figure.png", dpi=200, bbox_inches="tight")
print("Saved: visualizations/my_new_figure.png")
```

Do not write to the repo root, and do not invent ad-hoc subdirectories
(other than `legacy/`, which already exists for archived assets). Keep
the live folder flat for now; if/when there are >100 active figures we
will sub-organize.

## Active figure set (produced by current scripts)

These are the 41+ PNGs that any current script in `scripts/` actually
emits. Verified by source-code audit, not by README claim.

### Core pi/2 identity and iteration

| script | figures |
| --- | --- |
| `scripts/pi_half_discovery.py` | `pi_half_discovery.png` |
| `scripts/pi_half_convergence.py` | `pi_half_convergence_dynamics.png`, `pi_half_3d_attractor.png` |
| `scripts/geometric_pattern_analysis.py` | `geometric_pattern_visualization.png` |

### Functional / scaling tests

| script | figures |
| --- | --- |
| `scripts/complex_function_test.py` | `complex_function_comparison.png` |
| `scripts/function_comparison_test.py` | `function_comparison_extended.png` |
| `scripts/piecewise_scaling_test.py` | `piecewise_scaling_function.png` |
| `scripts/scaling_function_test.py` | `scaling_functions_comparison.png` |

### Fractals

| script | figures |
| --- | --- |
| `scripts/corner_region_fractal.py` | `corner_region_fractal.png`, `corner_contours.png`, `corner_fractal_evolution.png` |
| `scripts/phi_pi_fractals.py` | `phi_pi_fractal.png`, `fractal_contours.png`, `mandelbrot_pi_coloring.png`, `golden_spiral_grid.png` |

### Hilbert / operator framing

| script | figures |
| --- | --- |
| `scripts/hilbert_space_contour_connection.py` | `hilbert_space_connection.png` |
| `scripts/eigengeometry_viz_prototype.py` | `pixel_to_continuous.png`, `golden_spiral_circles.png`, `cube_to_sphere_3d.png`, `voxel_eigenvalue_smoothing.png`, `pentagon_phi_investigation.png`, `eigengeometry_dashboard.png` |
| `scripts/algorithm_applications.py` | `app1_image_smoothing.png`, `algorithm_applications_overview.png` |

### "pi shows up here too" survey scripts

| script | figures |
| --- | --- |
| `scripts/pi_in_physics.py` | `pi_in_physics.png` |
| `scripts/pi_in_differential_geometry.py` | `pi_in_differential_geometry.png` |
| `scripts/pi_in_fractals_and_chaos.py` | `pi_in_fractals_and_chaos.png` |
| `scripts/pi_and_probability.py` | `pi_and_probability.png` |

### Application demos

| script | figures |
| --- | --- |
| `scripts/mnist_neural_applications.py` | `mnist_enhancement_demo.png`, `neural_signal_analysis.png` |
| `scripts/arc_agi_pi_half.py` | `arc_agi_pi_half_solution.png` |
| `scripts/arc_agi_solver.py` | `arc_task_<task_id>_solution.png` (per-task; e.g. `arc_task_007bbfb7_solution.png`) |
| `scripts/gpu_accelerated_pi_half.py` | `gpu_benchmark_results.png`, `gpu_realtime_demo.png` (only if a CUDA device is present at runtime) |

### Real-data visualizations

These figures come from public scientific catalogs downloaded by
`scripts/fetch_data.py` and loaded via `discrete_calculus.io`. None
of them claim new physics; they reproduce textbook results from the
project's own loaders.

#### Stars and exoplanets

| script | figures |
| --- | --- |
| `scripts/star_visualizations.py`     | `hr_diagram_hyg.png`, `solar_neighborhood_3d.png`, `sqrt2_shell_stellar_counts.png`, `exoplanet_host_metallicity.png`, `tinsley_wallerstein_apogee.png`, `radial_metallicity_gradient.png` |
| `scripts/apogee_kiel_diagram.py`     | `kiel_diagram_apogee.png` |
| `scripts/apogee_disk_facedown.py`    | `galactic_disk_facedown.png` |
| `scripts/apogee_disk_edgeon.py`      | `galactic_disk_edgeon.png` |
| `scripts/apogee_skymap_aitoff.py`    | `apogee_skymap_aitoff.png` |
| `scripts/exoplanet_period_radius.py` | `exoplanet_period_radius.png` |

Three datasets feed these eleven figures:

- **HYG v4.0 stellar database** (~120k stars).
- **NASA Exoplanet Archive `pscomppars`** (~6.3k confirmed exoplanets).
- **APOGEE-2 DR17 allStar slim slice** (~419k stars, VizieR
  `III/286/catalog`). The radial metallicity gradient figure recovers
  `d[Fe/H]/dR = -0.068 dex/kpc` on the well-sampled 5-13 kpc range, in
  line with published APOGEE results.

The `sqrt(2)`-shell figure is the only one that explicitly ties to the
project's iteration math.

#### Solar system: asteroids and the Galactic Center

| script | figures |
| --- | --- |
| `scripts/eros_shape_3d.py`            | `eros_shape_3d_views.png` |
| `scripts/galactic_center_multiband.py`| `galactic_center_multiband.png` |

- Eros: NEAR Shoemaker `q=64` ICQ shape model in four orthogonal
  perspectives. Computes principal axis ratios from the vertex cloud.
- Galactic Center: 2MASS K-band, MSX E-band, and Bolocam 1.1 mm of
  the same field side by side, asinh percentile stretched.

#### Machine learning and chemistry

| script | figures |
| --- | --- |
| `scripts/mnist_class_averages.py`            | `mnist_class_averages.png` |
| `scripts/esol_solubility_vs_mw.py`           | `esol_solubility_vs_mw.png` |
| `scripts/chemistry_composition_space.py`     | `esol_composition_space.png` |
| `scripts/periodic_table_kernel.py`           | `periodic_table_kernel.png` |
| `scripts/element_pair_matrix.py`             | `element_pair_matrix.png` |
| `scripts/composition_complexity_shells.py`   | `composition_complexity_shells.png` |

- MNIST: per-class mean image, pixel std, and 6 sample digits per
  class.
- ESOL (Delaney 2004) aqueous solubility benchmark: log S vs MW
  scatter, ESOL paper prediction-vs-measurement comparison
  (RMSE = 0.91 log units), and the marginal log S distribution.
- ESOL composition space: log S binned into three 2D composition grids
  -- `(n_C, n_O)`, `(heavy_atoms, n_rings)`, `(heavy_atoms, rotatable_bonds)`
  -- shown raw vs `pi/2`-kernel-smoothed (NaN-aware), with per-cell
  molecule counts so you can see where the data is dense vs sparse.
  Demonstrates the kernel as an interpolator on a sparse, integer-index
  composition grid.
- Periodic table kernel: PubChem electronegativity, atomic radius, first
  ionization energy, and melting point laid out on the standard 9x18
  periodic-table grid. Each property is shown raw, `pi/2`-smoothed
  (NaN-aware so the empty grid cells get filled), and as the residual
  `raw - smoothed`. The smoothed columns recover the textbook periodic
  trends (EN increases up-and-right, radius increases down-and-left,
  etc.); residuals highlight the genuinely non-smooth points like the
  noble-gas IE jump and the W/Os melting-point peak.
- Element pair matrices: `(A, B) -> f(A, B)` for the first 92 elements
  sorted by atomic number, computed for `|Delta EN|`, atomic-radius
  ratio `max(r)/min(r)`, mass product `M_A * M_B`, and `|Delta IE|`.
  Each matrix is shown raw and `pi/2`-smoothed; the smoothing makes the
  effect of missing-data rows (e.g. several lanthanides) clearly visible
  by filling them in.
- Composition complexity shells (exploratory negative result): ESOL
  molecules binned by heavy-atom count using both linear-width-4 bins
  and `sqrt(2)`-spaced bins. Side-by-side comparison of count, mean
  log S, and mean rotatable bonds shows the trends are essentially
  identical -- i.e. the iteration's `sqrt(2)` scaling does not buy a
  qualitatively new view of ESOL chemistry. Kept in the repo as an
  honest "we tried it, here is what happened" figure.

#### Finite group theory

| script | figures |
| --- | --- |
| `scripts/monster_moonshine.py`        | `monster_moonshine.png` |
| `scripts/monster_element_orders.py`   | `monster_element_orders.png` |
| `scripts/sporadic_groups_orders.py`   | `sporadic_groups_orders.png` |

These three figures are about the Monster group `M` and its 25
sibling sporadic finite simple groups. None of them depends on the
project's `pi/2` kernel; they are honest visualizations of well-known
facts from the ATLAS of Finite Groups (Conway et al., 1985) and from
the OEIS.

- Moonshine: the four-panel figure plots (a) the j-function
  q-coefficients `c_n` for `n = 1..15`, (b) the small-integer
  decompositions `c_1 = 1 + 196,883`, `c_2 = 1 + 196,883 + 21,296,876`,
  `c_3 = 2 + 2 * 196,883 + 21,296,876 + 842,609,326` (each verified at
  runtime against the j-coefficient), (c) the Petersson-Rademacher
  asymptotic `log c_n ~ 4 pi sqrt(n)` (this is the only place `pi`
  enters the panel directly), and (d) the j-coefficients overlaid on
  the first eight Monster irreducible character degrees. The decomposition
  panel only goes through `c_3` because higher-coefficient
  decompositions in the literature use larger irreps with multiplicities
  that vary across published presentations -- I did not want to risk
  hard-coding a wrong digit.
- Element orders: `M` has 73 distinct element orders across its 194
  conjugacy classes, ranging from 1 to 119. Panel A is a "comb" of
  the integers 1..120 marking which occur (filled) vs not (open),
  with the 15 supersingular primes (the prime divisors of `|M|`)
  starred. Panel B lists the 47 integers in `[1, 120]` that do *not*
  occur. Panel C compares linear-width-10 binning to `sqrt(2)`-shell
  binning -- another exploratory negative result, in line with
  `composition_complexity_shells.png`.
- Sporadic groups: a horizontal-bar chart of `log10 |G|` for all 26
  sporadic finite simple groups, color-coded by Happy Family generation
  (Mathieu, Conway-related, Monster-related) vs pariah, plus a
  generation-stratified scatter on the bottom. Spans 50 orders of
  magnitude from `M_11` (7,920) to `M` (~8.08 * 10^53). The pariah set
  `{J_1, J_3, J_4, Ru, O'N, Ly}` is highlighted in pink.

#### 3D voxel smoothing + integration over a 4th axis

| script | figures |
| --- | --- |
| `scripts/galactic_voxel_3d_metallicity.py` | `galactic_voxel_3d_metallicity.png` |
| `scripts/galactic_voxel_3d_alpha.py`       | `galactic_voxel_3d_alpha.png` |
| `scripts/esol_voxel_3d_composition.py`     | `esol_voxel_3d_composition.png` |

These three figures exercise the project's *3D* ``pi/2`` kernel
(`apply_3d` from `discrete_calculus.kernels`) on real 4D data.
The pattern is the same in all three: bin the data into a 4D
histogram, compute the 0th moment ``N`` and 1st moment ``W`` along
the 4th axis, run ``apply_3d`` on each spatial 3D field
independently, and recover the per-voxel mean as the *ratio of
smoothed sums* ``W_smooth / N_smooth``. That ordering is the right
way to smooth a sparse voxel mean (it avoids dividing zero by zero
and is equivalent to smoothing the 4D cube spatially and then
re-marginalizing).

- **Galactic [Fe/H]**: ~389 k APOGEE-2 DR17 giants, 60 x 60 x 20 x 16
  cube over (x_GC, y_GC, z_GC, [Fe/H]) covering ``+/- 15 kpc``
  laterally, ``+/- 3 kpc`` vertically, and ``[Fe/H] in [-2.0, 0.5]``.
  The smoothed face-down view recovers the radial metallicity
  gradient; the smoothed edge-on view recovers the thin-disk /
  thick-disk vertical metallicity gradient.
- **Galactic [a/M]**: same APOGEE catalog, same voxel grid, with
  ``[a/M]`` (alpha-element-to-metals) as the 4th axis. The smoothed
  edge-on ``<[a/M]>`` panel cleanly separates the low-alpha thin
  disk near ``z = 0`` from the high-alpha thick disk and halo at
  ``|z| > 1.5 kpc`` -- the canonical Tinsley-Wallerstein dichotomy
  but as a spatial map instead of an abundance scatter plot.
- **ESOL composition**: 1,080 small organic molecules from
  Delaney (2004) binned into a 22 x 12 x 8 x 14 cube indexed by
  ``(n_C, n_O, n_N, log S)``, integer composition axes and 14
  log-solubility bins. The figure shows the smoothed mean log S as
  a (n_C, n_O) image with ``n_N`` integrated out, plus three
  individual ``n_N = 0, 1, 2`` slices. The cube is sparse by design
  (1.8% non-empty) -- this is the regime where 3D-kernel
  interpolation actually buys something over the raw histogram.

#### Project-internal math

| script | figures |
| --- | --- |
| `scripts/iteration_invariants.py`     | `iteration_invariants.png` |

The canonical `s_{n+1} = s_n * sqrt(2)` iteration plotted four ways:
geometric growth, ratio invariants (`circle/square = pi/2`,
`square/triangle = 8`, both held to machine precision over 60 steps),
cumulative-area closed form, and the linear-operator view
`s_{n+1} = sqrt(2) * s_n`.

See `notes/star_datasets.md` (stars), `notes/space_datasets.md`
(asteroids/FITS), and the source code of each script for details.

## Legacy figures (`legacy/`)

The 24 PNGs under `visualizations/legacy/` were imported with the
original code dump and have **no producing script** in the current
`scripts/` or `src/` (verified by `re.search(savefig\\(\\s*['\"]([^'\"]+)`
across both directories). They were generated outside this repo, by
scripts that no longer exist, or by Mathematica/notebook code that was
never committed.

They split roughly into two groups:

**Math-style legacy figures (could be recreated as honest analyses if
desired):**

`detailed_iteration_0.png`, `detailed_iteration_1.png`,
`extended_iteration_scales.png`, `geometric_pattern_iterations.png`,
`function_comparison.png`, `recursive_hilbert_spaces.png`,
`scaling_analysis.png`, `jacobian_exploration.png`,
`gaussian_pressure_models.png`, `q1_extended_shells.png`,
`q2_gap_acceleration.png`, `q3_hypotenuse_curvature.png`,
`hypotenuse_gauge.png`, `electron_shells_structure.png`,
`prime_shells_analysis.png`, `graphene_box_intrinsic_geometry.png`.

**Aspirational/marketing mockups (treat as illustrations, not
evidence):**

`autonomous_healthcare_system.png`, `computational_economy.png`,
`computational_foundation.png`, `jetson_a100_fleet_optimization.png`,
`mothership_swarm_coordination.png`, `observer_dependent_complexity.png`,
`p2p_medical_ai_network.png`, `surgery_bias_complexity_unified.png`.

If you want to delete any of these, do so explicitly (`git rm
visualizations/legacy/<name>.png`); none of them is on the regenerate
path so removal will not break anything. If you want to revive one, the
right move is to commit a new script under `scripts/` that produces it
from current code, then `git mv` the file back up out of `legacy/`.

## Honest labels

None of the PNGs in this folder are external data. They are all outputs
of this repo's own (current or historical) plotting code. For real
external data, see `../data/` (downloaded by `../scripts/fetch_data.py`).
