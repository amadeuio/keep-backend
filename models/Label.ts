import pool from "../config/database";
import { Label } from "../types/labels";
import { keysToCamel } from "../utils/caseConverter";

const LabelModel = {
  findAll: async (): Promise<Label[]> => {
    const result = await pool.query(
      "SELECT * FROM labels ORDER BY created_at DESC"
    );
    return result.rows.map(keysToCamel);
  },

  create: async (id: string, name: string): Promise<Label> => {
    const result = await pool.query(
      "INSERT INTO labels (id, name) VALUES ($1, $2) RETURNING *",
      [id, name]
    );
    return keysToCamel(result.rows[0]);
  },

  update: async (id: string, name: string): Promise<Label> => {
    const result = await pool.query(
      "UPDATE labels SET name = $1, updated_at = NOW() WHERE id = $2 RETURNING *",
      [name, id]
    );
    return keysToCamel(result.rows[0]);
  },

  delete: async (id: string): Promise<boolean> => {
    const result = await pool.query(
      "DELETE FROM labels WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rowCount ? result.rowCount > 0 : false;
  },
};

export default LabelModel;
