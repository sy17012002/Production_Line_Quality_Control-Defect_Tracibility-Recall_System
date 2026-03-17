const express = require("express");
const path = require("path");
const supabase = require("../supabaseClient");
const router = express.Router();

// Evaluate production batch
router.post("/evaluate_batch", async (req, res) => {
  try {
      const { batch_id, inspector_id, inspection_id, status, defect, evidence, inspection_date } = req.body;

      const { data, error } = await supabase
          .from("qc_inspections")
          .insert([{
              batch_id,
              inspector_id,
              inspection_id,
              status,
              defect,
              evidence,
              inspection_date
          }])
          .select();

      if (error) throw error;

      res.status(201).json({ message: "Batch evaluation completed successfully!", batch: data[0] });
      } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
      }
});

module.exports = router;