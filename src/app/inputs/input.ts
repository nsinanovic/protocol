import { TheDb } from '../model/thedb';

/**
 * Simple class for selecting, inserting, updating and deleting Inputs in inputs table.
 *
 * @export
 * @class Input
 */
export class Input {
    public id = -1;
    public name = '';

    public static get(id: number): Promise<Input> {
        const sql = 'SELECT * FROM inputs WHERE id = $id';
        const values = { $id: id };

        return TheDb.selectOne(sql, values)
            .then((row) => {
                if (row) {
                    return new Input().fromRow(row);
                } else {
                    throw new Error('Expected to find 1 Input. Found 0.');
                }
            });
    }

    public static getAll(): Promise<Input[]> {
        const sql = `SELECT * FROM inputs ORDER BY name`;
        const values = {};

        return TheDb.selectAll(sql, values)
            .then((rows) => {
                const inputs: Input[] = [];
                for (const row of rows) {
                    const input = new Input().fromRow(row);
                    inputs.push(input);
                }
                return inputs;
            });
    }

    public insert(): Promise<void> {
        const sql = `
            INSERT INTO inputs (name)
            VALUES($name)`;

        const values = {
            $name: this.name,
        };

        return TheDb.insert(sql, values)
            .then((result) => {
                if (result.changes !== 1) {
                    throw new Error(`Expected 1 Input to be inserted. Was ${result.changes}`);
                } else {
                    this.id = result.lastID;
                }
            });
    }

    public update(): Promise<void> {
        const sql = `
            UPDATE inputs
               SET name = $name
             WHERE id = $id`;

        const values = {
            $name: this.name,
        };

        return TheDb.update(sql, values)
            .then((result) => {
                if (result.changes !== 1) {
                    throw new Error(`Expected 1 Input to be updated. Was ${result.changes}`);
                }
            });
    }

    public delete(): Promise<void> {
        const sql = `
            DELETE FROM inputs WHERE id = $id`;

        const values = {
            $id: this.id,
        };

        return TheDb.delete(sql, values)
            .then((result) => {
                if (result.changes !== 1) {
                    throw new Error(`Expected 1 Input to be deleted. Was ${result.changes}`);
                }
            });
    }

    public fromRow(row: object): Input {
        this.id = row['id'];
        this.name = row['name'];

        return this;
    }
}
