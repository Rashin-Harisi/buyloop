/**
 * @swagger
 * tags:
 *   - name: Options
 *     description: Options module and routes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateOptions:
 *       type: object
 *       required:
 *         - title
 *         - key
 *         - category
 *         - type 
 *       properties:
 *         title:
 *           type: string
 *         key:
 *           type: string
 *         category:
 *           type: string
 *         guid:
 *           type: string
 *         type:
 *           type: string
 *           enum:
 *              -   number
 *              -   string
 *              -   boolean
 *              -   array
 *         enum:
 *           type: array
 *           items:
 *              type: string
 */

/**
 * @swagger
 * /options:
 *   post:
 *     summary: create a new options list for a category 
 *     tags: [Options]
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             $ref: '#/components/schemas/CreateOptions'
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateOptions'
 *     responses:
 *       201:
 *         description: options created successfully
 *   get:
 *     summary: get all options
 *     tags: [Options]
 *     responses:
 *       200:
 *         description: get all options successfully
 * /options/by-category/{categoryId}:
 *   get:
 *     summary: get all options of a category by categoryId
 *     parameters:
 *       -  in: path
 *          name: categoryId
 *          type: string
 *     tags: [Options]
 *     responses:
 *       200:
 *         description: get all options of a category by categoryId successfully
 * /options/{id}:
 *   get:
 *     summary: get all options of a category by id
 *     parameters:
 *       -  in: path
 *          name: id
 *          type: string
 *     tags: [Options]
 *     responses:
 *       200:
 *         description: get all options of a category by id successfully
 */
