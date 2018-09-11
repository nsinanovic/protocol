import { TheDb } from '../model/thedb';

/**
 * Simple class for selecting, inserting, updating and deleting Inputs in inputs table.
 *
 * @export
 * @class Input
 */
export class Input {
    public id: number;
    public subject: string;
    public filename: string;
    public baseNumber: string;
    public dateReceived: Date;
    public mark: string;
    public userId: number;
    public customerId: number;
    public dateCreated: Date;
    public filepath: string;
    public uniquefilename: string;



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
        const sql = `SELECT * FROM inputs ORDER BY dateReceived`;
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
            INSERT INTO inputs (subject, filename, baseNumber, dateReceived, mark, userId, customerId, dateCreated, filepath, uniquefilename)
            VALUES($subject, $filename, $baseNumber, $dateReceived, $mark, $userId, $customerId, $dateCreated, $filepath, $uniquefilename)`;

        const values = {
            $subject: this.subject,
            $filename: this.filename,
            $baseNumber: this.baseNumber,
            $dateReceived: this.dateReceived,
            $mark: this.mark,
            $userId: this.userId,
            $customerId: this.customerId,
            $dateCreated: this.dateCreated,
            $filepath: this.filepath,
            $uniquefilename: this.uniquefilename
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
               SET subject = $subject, filename = $filename, baseNumber = $baseNumber, dateReceived = $dateReceived, mark = $mark, userId = $userId, customerId = $customerId, dateCreated = $dateCreated, filepath = $filepath, uniquefilename = $uniquefilename
             WHERE id = $id`;

             const values = {
                $subject: this.subject,
                $filename: this.filename,
                $baseNumber: this.baseNumber,
                $dateReceived: this.dateReceived,
                $mark: this.mark,
                $userId: this.userId,
                $customerId: this.customerId,
                $dateCreated: this.dateCreated,
                $filepath: this.filepath,
                $uniquefilename: this.uniquefilename
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
        this.filename = row['filename'];
        this.subject = row['subject'];
        this.baseNumber = row['baseNumber'];
        this.dateReceived = row['dateReceived'];
        this.mark = row['mark'];
        this.userId = row['userId'];
        this.customerId = row['customerId'];
        this.dateCreated = row['dateCreated'];
        this.filepath = row['filepath'];
        this.uniquefilename = row['uniquefilename'];

        return this;
    }
}
